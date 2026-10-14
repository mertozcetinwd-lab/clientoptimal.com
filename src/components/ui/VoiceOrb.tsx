import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import VoiceOrbStill from './VoiceOrbStill';

// Client Optimal Voice AI Interactive Demo
// Powered by Retell AI WebRTC engine and real-time WebGL Fluid Cloud Orb.
// Strictly adheres to Client Optimal design system (tokens.css).
//
// 2026-09-19: the orb canvas now comes from the shared FluidCloudOrb component;
// the shader implementation is unchanged and lives in FluidCloudOrb.tsx.
import type { OrbState } from './FluidCloudOrb';

const FluidCloudOrb = React.lazy(() => import('./FluidCloudOrb'));

interface TranscriptEntry {
  role: 'agent' | 'user';
  text: string;
}

export default function VoiceOrb() {
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [inputVolume, setInputVolume] = useState<number>(0);
  const [outputVolume, setOutputVolume] = useState<number>(0);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [audioConsent, setAudioConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);

  const retellClientRef = useRef<RetellWebClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Monitor user microphone volume
  const startMicAnalysis = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          const normalized = Math.min(1, avg / 85);
          setInputVolume(normalized);
        }
        animFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch {
      // Microphone analysis fallback
    }
  }, []);

  const stopMicAnalysis = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setInputVolume(0);
  }, []);

  // Call duration counter
  useEffect(() => {
    if (orbState === 'listening' || orbState === 'speaking') {
      if (!timerRef.current) {
        timerRef.current = window.setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (orbState === 'idle') {
        setCallDuration(0);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [orbState]);

  // Start Voice Call with Retell AI
  const startCall = useCallback(async () => {
    if (!audioConsent) {
      setErrorMessage('Please agree to send sample audio to Retell AI before starting.');
      return;
    }
    try {
      setErrorMessage(null);
      setOrbState('connecting');
      setTranscript([]);

      const response = await fetch('/api/demo/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with HTTP ${response.status}`);
      }

      const data = await response.json();
      const accessToken = data.access_token || data.accessToken;
      if (!accessToken) {
        throw new Error('No access token received from call endpoint');
      }

      const client = new RetellWebClient();
      retellClientRef.current = client;

      client.on('call_started', () => {
        setOrbState('listening');
        startMicAnalysis();
      });

      client.on('agent_start_talking', () => {
        setOrbState('speaking');
        const checkVolume = () => {
          if (retellClientRef.current) {
            try {
              const vol = (
                retellClientRef.current as unknown as {
                  analyzerComponent?: { calculateVolume?: () => number };
                }
              ).analyzerComponent?.calculateVolume?.();
              if (typeof vol === 'number') {
                setOutputVolume(Math.min(1, vol * 1.5));
              } else {
                setOutputVolume(0.5 + 0.3 * Math.sin(Date.now() / 120));
              }
            } catch {
              setOutputVolume(0.5 + 0.3 * Math.sin(Date.now() / 120));
            }
          }
        };
        const volInterval = setInterval(checkVolume, 50);
        const onStopTalking = () => {
          clearInterval(volInterval);
          setOutputVolume(0);
          client.off('agent_stop_talking', onStopTalking);
        };
        client.on('agent_stop_talking', onStopTalking);
      });

      client.on('agent_stop_talking', () => {
        setOrbState('listening');
        setOutputVolume(0);
      });

      client.on('update', (update) => {
        if (update && Array.isArray(update.transcript)) {
          const formatted: TranscriptEntry[] = update.transcript.map(
            (item: { role: string; content: string }) => ({
              role: item.role === 'agent' ? 'agent' : 'user',
              text: item.content || '',
            })
          );
          setTranscript(formatted);
        }
      });

      client.on('call_ended', () => {
        setOrbState('idle');
        stopMicAnalysis();
      });

      client.on('error', (err) => {
        setOrbState('error');
        setErrorMessage(
          typeof err === 'string' ? err : err?.message || 'Connection error occurred'
        );
        stopMicAnalysis();
      });

      await client.startCall({ accessToken });
    } catch (err: unknown) {
      setOrbState('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to connect call');
      stopMicAnalysis();
    }
  }, [audioConsent, startMicAnalysis, stopMicAnalysis]);

  // Stop Call
  const stopCall = useCallback(() => {
    if (retellClientRef.current) {
      try {
        retellClientRef.current.stopCall();
      } catch {
        // Safe cleanup
      }
      retellClientRef.current = null;
    }
    stopMicAnalysis();
    setOrbState('idle');
  }, [stopMicAnalysis]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (micStreamRef.current) {
      const audioTracks = micStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const isCallActive =
    orbState === 'listening' || orbState === 'speaking' || orbState === 'connecting';

  return (
    <div className="voice-card">
      {/* Card Header */}
      <div className="voice-card-header">
        <div className="badge">
          <span className={`badge-dot ${isCallActive ? 'live' : ''}`} aria-hidden="true" />
          <span>{isCallActive ? `SAMPLE · ${formatTime(callDuration)}` : 'BROWSER SAMPLE'}</span>
        </div>

        <h2 className="voice-title">AI call intake sample</h2>
        <p className="voice-subtitle">
          This interactive sample connects you to an AI voice assistant for a fictional service
          business. It may not match an approved client call flow. Browser audio goes to Retell AI;
          no real phone call, customer message, text, or booking is made. Starting may create metered
          Retell usage billed to Client Optimal; the rate and account balance are unverified.
        </p>
      </div>

      {/* 3D Visualizer Orb Stage */}
      <div className="orb-stage">
        <div className={`orb-halo ${isCallActive ? 'active' : ''}`} />
        <React.Suspense fallback={<VoiceOrbStill size={250} />}>
            <FluidCloudOrb
              state={orbState}
              volume={audioConsent ? (orbState === 'speaking' ? outputVolume : inputVolume) : 0}
              onClick={audioConsent ? (isCallActive ? stopCall : startCall) : undefined}
              size={250}
              title={audioConsent ? (isCallActive ? 'End the sample call' : 'Start the sample call') : undefined}
            />
        </React.Suspense>
      </div>

      {/* State & Call Status HUD */}
      <div className="status-hud">
        <span className={`status-pill ${orbState}`}>
          {orbState === 'idle' && 'Check the consent box before starting. Use fictional details only.'}
          {orbState === 'connecting' && 'Connecting the browser sample...'}
          {orbState === 'listening' &&
            (isMuted ? 'Microphone muted' : 'Listening: speak naturally...')}
          {orbState === 'speaking' && 'Assistant speaking...'}
          {orbState === 'error' && 'Notice: Call disconnected'}
        </span>

        {errorMessage && (
          <div className="error-alert">
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {!isCallActive && (
        <label className="voice-consent">
          <input
            type="checkbox"
            checked={audioConsent}
            onChange={(event) => setAudioConsent(event.target.checked)}
          />
          <span>
            I agree to send microphone audio to Retell AI to run this sample. Retention and
            model-use settings are unverified. Starting may create metered usage billed to Client
            Optimal; the rate and account balance are unverified. I will use fictional details only.
          </span>
        </label>
      )}

      {/* Controls */}
      <div className="controls-row">
        {!isCallActive ? (
          <button
            type="button"
            className="btn primary start-btn"
            onClick={startCall}
            disabled={!audioConsent}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Start sample</span>
          </button>
        ) : (
          <div className="active-controls">
            <button
              type="button"
              className={`btn mute-btn ${isMuted ? 'muted' : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  <span>Mute</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn end-btn"
              onClick={stopCall}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.09 9.91" />
                <line x1="23" y1="1" x2="1" y2="23" />
              </svg>
              <span>End Call</span>
            </button>
          </div>
        )}
      </div>

      {/* Realtime Transcript Box */}
      {transcript.length > 0 && (
        <div className="transcript-box">
          <div className="transcript-head">
            <span className="transcript-tag">Live Transcript</span>
            <span className="transcript-count">{transcript.length} turns</span>
          </div>
          <div className="transcript-list">
            {transcript.map((item, idx) => (
              <div key={idx} className={`transcript-row ${item.role}`}>
                <span className="transcript-role">
                  {item.role === 'agent' ? 'Assistant:' : 'You:'}
                </span>
                <span className="transcript-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Meta Note */}
      <div className="voice-card-footer">
        <span className="meta-text">
          Audio is processed by Retell AI. Settings unverified.{' '}
          <a href="/privacy">Privacy details</a>
        </span>
      </div>

      {/* Scoped CSS using exact Client Optimal design tokens */}
      <style>{`
        .voice-card {
          width: 100%;
          background: var(--panel);
          border: var(--hair-w) solid var(--hair-2);
          border-radius: 8px;
          padding: clamp(1.8rem, 4vw, 2.6rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 14px 36px rgba(0, 0, 0, 0.06), 0 0 32px var(--glow-accent);
          position: relative;
          overflow: hidden;
          font-family: var(--font-body);
          color: var(--text);
          box-sizing: border-box;
          transition: background-color var(--t-med) var(--ease), border-color var(--t-med) var(--ease);
        }

        .voice-card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          max-width: 38rem;
          margin-bottom: 1.2rem;
        }

        .badge-dot.live {
          background: var(--accent-neon);
          box-shadow: 0 0 12px var(--accent-neon);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.7; }
        }

        .voice-title {
          font-family: var(--font-display);
          font-size: clamp(1.45rem, 3.2vw, 1.95rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: var(--ls-h2);
          color: var(--text);
          margin: 0;
        }

        .voice-subtitle {
          font-family: var(--font-body);
          font-size: var(--step-body);
          line-height: 1.55;
          color: var(--text-dim);
          margin: 0;
        }
        .voice-consent {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          max-width: 34rem;
          margin: 0.5rem auto 1rem;
          color: var(--text-dim);
          font-size: 0.82rem;
          line-height: 1.5;
          text-align: left;
        }
        .voice-consent input {
          flex: none;
          width: 1.1rem;
          height: 1.1rem;
          margin-top: 0.1rem;
          accent-color: var(--accent);
        }
        .start-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          box-shadow: none;
        }

        .orb-stage {
          position: relative;
          width: 270px;
          height: 270px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1.2rem 0;
        }

        .orb-halo {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 24%, transparent) 0%, transparent 72%);
          pointer-events: none;
          transition: opacity 0.5s ease;
          opacity: 0.45;
        }

        .orb-halo.active {
          opacity: 0.95;
        }

        .status-hud {
          margin-bottom: 1.2rem;
          min-height: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .status-pill {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dim);
          padding: 0.45em 0.9em;
          border: var(--hair-w) solid var(--hair-2);
          background: color-mix(in srgb, var(--bg) 60%, transparent);
          border-radius: 4px;
        }

        .status-pill.listening {
          border-color: var(--accent);
          color: var(--accent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 25%, transparent);
        }

        .status-pill.speaking {
          border-color: var(--accent-neon);
          color: var(--accent-neon);
          box-shadow: 0 0 12px color-mix(in srgb, var(--accent-neon) 30%, transparent);
        }

        .status-pill.connecting {
          border-color: var(--hair-2);
          color: var(--text-dim);
        }

        .status-pill.error {
          border-color: #ef4444;
          color: #ef4444;
        }

        .error-alert {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 4px;
          padding: 0.4rem 0.8rem;
          max-width: 32rem;
        }

        .controls-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .start-btn {
          cursor: pointer;
          font-size: var(--step-small);
          padding: 0.85em 1.8em;
          gap: 0.65em;
        }

        .active-controls {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .mute-btn {
          cursor: pointer;
          font-size: var(--step-small);
          padding: 0.8em 1.3em;
        }

        .mute-btn.muted {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #ef4444;
        }

        .end-btn {
          cursor: pointer;
          font-size: var(--step-small);
          padding: 0.8em 1.5em;
          background: #ef4444;
          border-color: #ef4444;
          color: #ffffff;
        }

        .end-btn:hover {
          filter: brightness(1.12);
        }

        .transcript-box {
          width: 100%;
          max-width: 34rem;
          margin-top: 1rem;
          border: var(--hair-w) solid var(--hair);
          border-radius: 6px;
          background: color-mix(in srgb, var(--bg) 50%, transparent);
          overflow: hidden;
          text-align: left;
        }

        .transcript-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.9rem;
          border-bottom: var(--hair-w) solid var(--hair);
          background: color-mix(in srgb, var(--bg) 75%, transparent);
        }

        .transcript-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .transcript-count {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--muted);
        }

        .transcript-list {
          padding: 0.8rem 0.9rem;
          max-height: 180px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .transcript-row {
          font-size: 0.88rem;
          line-height: 1.45;
          display: flex;
          gap: 0.4rem;
        }

        .transcript-role {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          flex-shrink: 0;
          padding-top: 0.1rem;
        }

        .transcript-row.agent .transcript-role {
          color: var(--accent);
        }

        .transcript-row.user .transcript-role {
          color: var(--text-dim);
        }

        .transcript-text {
          color: var(--text);
        }

        .voice-card-footer {
          margin-top: 1.2rem;
          padding-top: 0.8rem;
          border-top: var(--hair-w) solid var(--hair);
          width: 100%;
        }

        .meta-text {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}
