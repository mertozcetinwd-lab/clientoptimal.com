import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

// Client Optimal Voice AI Interactive Demo
// Powered by Retell AI WebRTC engine and real-time WebGL Fluid Cloud Orb.
// Strictly adheres to Client Optimal design system (tokens.css).

export type OrbState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';

interface TranscriptEntry {
  role: 'agent' | 'user';
  text: string;
}

// Self-contained WebGL Fluid Cloud Shader Orb (Siri / Hume / Apple Intelligence aesthetic)
function FluidCloudOrb({
  state,
  volume,
  onClick,
  size = 250,
}: {
  state: OrbState;
  volume: number;
  onClick: () => void;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_activity;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.52;
        mat2 rotation = mat2(0.80, 0.60, -0.60, 0.80);
        for (int octave = 0; octave < 5; octave++) {
          value += amplitude * noise(p);
          p = rotation * p * 1.92 + vec2(9.7, 4.3);
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 centered = uv - 0.5;
        float radius = length(centered);
        float edge = 1.0 - smoothstep(0.485, 0.5, radius);
        if (edge <= 0.0) discard;

        vec2 p = centered * 2.0;
        float t = u_time;
        vec2 warp = vec2(
          fbm(p * 1.02 + vec2(t * 0.34, -t * 0.24)),
          fbm(p * 1.08 + vec2(-t * 0.27, t * 0.32) + vec2(6.7, 2.9))
        );
        vec2 curl = vec2(
          sin(p.y * 2.4 + t * 0.68 + warp.y * 3.2),
          cos(p.x * 2.1 - t * 0.61 + warp.x * 3.0)
        );
        vec2 warped = p + (warp - 0.5) * (1.18 + u_activity * 0.38) + curl * (0.035 + u_activity * 0.07);
        float broad = fbm(warped * 0.92 + vec2(t * 0.14, -t * 0.18));
        float folded = fbm(warped * 1.66 + vec2(-t * 0.23, t * 0.19) + 5.2);
        float field = mix(broad, folded, 0.3 + u_activity * 0.14);

        float horizon = 0.46 + 0.08 * sin((uv.x + warp.x * 0.2) * 5.4 + t * 0.42) + 0.16 * (broad - 0.5);
        float upper = smoothstep(horizon - 0.12, horizon + 0.08, uv.y);
        float band = exp(-pow((uv.y - horizon) * (5.2 + u_activity * 0.8), 2.0));
        float cloud = smoothstep(0.24, 0.79, field);

        // Electric Azure & Arctic Ice Blue palette
        vec3 deepBlue = vec3(0.08, 0.25, 0.78);
        vec3 brightBlue = vec3(0.22, 0.48, 0.98);
        vec3 lightLavender = vec3(0.65, 0.82, 0.99);
        vec3 milk = vec3(0.95, 0.97, 1.0);

        vec3 color = mix(lightLavender, brightBlue, upper);
        float upperDepth = upper * (0.14 + smoothstep(0.42, 0.78, folded) * 0.5);
        color = mix(color, deepBlue, upperDepth);

        float milkAmount = clamp(band * (0.42 + cloud * 0.62), 0.0, 0.88);
        color = mix(color, milk, milkAmount);

        float lowerMist = (1.0 - upper) * smoothstep(0.58, 0.9, broad) * 0.18;
        color = mix(color, milk, lowerMist);

        float grain = (noise(gl_FragCoord.xy * 0.64) - 0.5) / 255.0;
        color += grain;

        gl_FragColor = vec4(color * edge, edge);
      }
    `;

    function createShader(type: number, src: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const px = Math.round(size * dpr);
    canvas.width = px;
    canvas.height = px;
    gl.viewport(0, 0, px, px);

    const aPos = gl.getAttribLocation(prog, 'a_position');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uAct = gl.getUniformLocation(prog, 'u_activity');

    gl.useProgram(prog);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uRes, px, px);

    const start = performance.now();
    let currentAct = 0.15;

    const render = (now: number) => {
      const elapsed = (now - start) / 1000;
      const targetAct =
        state === 'speaking'
          ? Math.max(0.42, volume)
          : state === 'listening'
          ? Math.max(0.22, volume)
          : 0.13;
      currentAct += (targetAct - currentAct) * 0.1;

      gl.uniform1f(uTime, elapsed * (0.75 + currentAct * 0.7));
      gl.uniform1f(uAct, currentAct);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [size, state, volume]);

  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 8px 36px rgba(37, 99, 235, 0.32), 0 0 40px rgba(56, 189, 248, 0.25)',
        display: 'block',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      title="Click to start or stop call"
    />
  );
}

export default function VoiceOrb() {
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [inputVolume, setInputVolume] = useState<number>(0);
  const [outputVolume, setOutputVolume] = useState<number>(0);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
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
  }, [startMicAnalysis, stopMicAnalysis]);

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
          <span>{isCallActive ? `LIVE CALL · ${formatTime(callDuration)}` : 'LIVE VOICE DEMO'}</span>
        </div>

        <h2 className="voice-title">Talk to our AI receptionist</h2>
        <p className="voice-subtitle">
          Test how it answers your business name, qualifies the job, flags emergency water or gas
          leaks, and texts you the details.
        </p>
      </div>

      {/* 3D Visualizer Orb Stage */}
      <div className="orb-stage">
        <div className={`orb-halo ${isCallActive ? 'active' : ''}`} />
        <FluidCloudOrb
          state={orbState}
          volume={orbState === 'speaking' ? outputVolume : inputVolume}
          onClick={isCallActive ? stopCall : startCall}
          size={250}
        />
      </div>

      {/* State & Call Status HUD */}
      <div className="status-hud">
        <span className={`status-pill ${orbState}`}>
          {orbState === 'idle' && 'Ready: Click Start Conversation to speak'}
          {orbState === 'connecting' && 'Establishing secure WebRTC connection...'}
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

      {/* Controls */}
      <div className="controls-row">
        {!isCallActive ? (
          <button
            type="button"
            className="btn primary start-btn"
            onClick={startCall}
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
            <span>Start Conversation</span>
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
        <span className="meta-text">Runs on Retell AI WebRTC · Direct browser audio</span>
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
          animation: haloBreathe 3s ease-in-out infinite alternate;
        }

        @keyframes haloBreathe {
          0% { transform: scale(0.96); opacity: 0.7; }
          100% { transform: scale(1.15); opacity: 1; }
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
