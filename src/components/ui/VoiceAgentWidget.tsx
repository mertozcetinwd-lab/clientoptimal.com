import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { RetellWebClient } from 'retell-client-js-sdk';
import type { OrbState } from './FluidCloudOrb';

const FluidCloudOrb = React.lazy(() => import('./FluidCloudOrb'));

// Floating voice-agent widget, added 2026-09-19.
//
// A glowing-orb launcher sits in the page's bottom corner on every page of the
// site (mounted once in Base.astro, hidden on /demo which hosts the full card).
// Opening it reveals a modal with the same Retell WebRTC demo the /demo page
// runs: the browser asks Retell for a short-lived web-call token via
// /api/demo/create-web-call and connects directly, so no key or agent id ever
// reaches the browser. The endpoint is DEV-ONLY (see astro.config.mjs); when it
// is not deployed the widget shows an honest "demo not configured" panel that
// routes people to the phone number instead of a dead button.
//
// States: idle -> connecting (token fetch + WebRTC handshake) -> listening /
// speaking -> ended (or error at any step). Microphone permission is requested
// by Retell's startCall and surfaced as its own error path.
//
// Accessibility: the trigger is a real <button>; the modal is role="dialog"
// aria-modal with a focus trap, Escape to close, focus restored on close, an
// aria-live status line so screen readers hear state changes, and 44px minimum
// touch targets. Body scroll is locked while open. Calls are never placed to a
// phone: this is a browser microphone session only.

type Phase =
  | 'closed'
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'speaking'
  | 'ending'
  | 'ended'
  | 'error'
  | 'unconfigured';

const COPY = {
  launcherLabel: 'Hear a sample demo',
  launcherTooltip: 'Opens an interactive browser sample. Microphone required to start.',
  modalTitle: 'AI call intake sample',
  modalLead:
    'You are speaking with an AI assistant for a fictional home-service business. This browser sample does not capture a real customer call, but microphone audio is sent to Retell AI and an on-screen transcript may appear. No phone call, text, booking, or emergency response is made. Starting may create metered Retell usage billed to Client Optimal; the rate and account balance are unverified.',
  idleHint: 'Check the consent box, then start. Use fictional details only.',
  connecting: 'Connecting to the Retell AI sample…',
  listeningMuted: 'Microphone muted',
  listening: 'Listening. Speak naturally…',
  speaking: 'Assistant speaking…',
  ended: 'Call ended. Thanks for trying it.',
  micDenied:
    'Microphone access was blocked. Allow the mic in your browser settings and try again, or just call us instead.',
  genericError: 'The demo call could not connect. Try again, or call us directly.',
  unconfiguredTitle: 'The live demo is not wired up here',
  unconfiguredBody:
    'The interactive sample is unavailable in this build. See the labeled sample on the demo page or contact Client Optimal about a proposed call flow.',
  callUs: 'Call instead',
  start: 'Start sample',
  resume: 'Start again',
  mute: 'Mute',
  unmute: 'Unmute',
  end: 'End call',
  close: 'Close',
  privacy: 'Audio is sent to Retell AI. Retention and model-use settings are unverified. Use fictional details only.',
};

interface TranscriptEntry {
  role: 'agent' | 'user';
  text: string;
}

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export default function VoiceAgentWidget() {
  const [phase, setPhase] = useState<Phase>('closed');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [audioConsent, setAudioConsent] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [volume, setVolume] = useState(0);

  const retellClientRef = useRef<RetellWebClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const volumeTimerRef = useRef<number | null>(null);

  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const startBtnRef = useRef<HTMLButtonElement | null>(null);

  const callActive = phase === 'connecting' || phase === 'listening' || phase === 'speaking';
  const modalOpen = open && phase !== 'unconfigured';

  useBodyScrollLock(open);

  // Any element on any page can open the widget with [data-open-voice-widget];
  // Base.astro's delegated click script turns those into this window event.
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setPhase('idle');
      setAudioConsent(false);
    };
    window.addEventListener('open-voice-widget', onOpen);
    return () => window.removeEventListener('open-voice-widget', onOpen);
  }, []);

  // ---- mic volume metering (drives the orb) --------------------------------
  const stopMicMetering = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (volumeTimerRef.current) {
      clearInterval(volumeTimerRef.current);
      volumeTimerRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setVolume(0);
  }, []);

  const startMicMetering = useCallback(async () => {
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
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i];
          setVolume(Math.min(1, sum / data.length / 85));
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // metering is cosmetic; the call itself reports mic failures
    }
  }, []);

  // ---- call duration timer --------------------------------------------------
  useEffect(() => {
    if (callActive) {
      if (!timerRef.current) {
        timerRef.current = window.setInterval(() => setCallDuration((s) => s + 1), 1000);
      }
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (phase === 'closed') setCallDuration(0);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [callActive, phase]);

  // ---- teardown on unmount --------------------------------------------------
  useEffect(() => {
    return () => {
      if (retellClientRef.current) {
        try {
          retellClientRef.current.stopCall();
        } catch {
          /* already gone */
        }
      }
      stopMicMetering();
    };
  }, [stopMicMetering]);

  // The End button: show a brief "ending" phase while the WebRTC session tears
  // down, then land on the success state. The call_ended event usually arrives
  // first and hangup('ended') wins; the timer is the fallback if it never does.
  const endCall = useCallback(() => {
    setPhase('ending');
    if (retellClientRef.current) {
      try {
        retellClientRef.current.stopCall();
      } catch {
        /* safe cleanup */
      }
      retellClientRef.current = null;
    }
    stopMicMetering();
    setIsMuted(false);
    window.setTimeout(() => {
      setPhase((cur) => (cur === 'ending' ? 'ended' : cur));
    }, 1500);
  }, [stopMicMetering]);

  const hangup = useCallback(
    (next: Phase, message?: string) => {
      if (retellClientRef.current) {
        try {
          retellClientRef.current.stopCall();
        } catch {
          /* safe cleanup */
        }
        retellClientRef.current = null;
      }
      stopMicMetering();
      setIsMuted(false);
      setErrorMessage(message ?? null);
      setPhase(next);
    },
    [stopMicMetering]
  );

  const startCall = useCallback(async () => {
    if (!audioConsent) {
      setErrorMessage('Please agree to send sample audio to Retell AI before starting.');
      return;
    }
    setErrorMessage(null);
    setTranscript([]);
    setCallDuration(0);
    setPhase('connecting');
    let client: RetellWebClient | null = null;
    try {
      const res = await fetch('/api/demo/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 404 || res.status === 405 || res.status === 501) {
        // Endpoint absent (static build) or deployed without credentials:
        // this deployment has no voice backend wired up.
        setPhase('unconfigured');
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Server responded with HTTP ${res.status}`);
      }
      const data = await res.json();
      const accessToken = data.access_token || data.accessToken;
      if (!accessToken) throw new Error('No access token received from call endpoint');

      // Lazy-load the SDK: it only reaches the browser when a visitor actually
      // starts a call, so the launcher costs the page almost nothing.
      const { RetellWebClient: Client } = await import('retell-client-js-sdk');
      client = new Client();
      retellClientRef.current = client;

      client.on('call_started', () => {
        setPhase('listening');
        startMicMetering();
      });
      client.on('agent_start_talking', () => setPhase('speaking'));
      client.on('agent_stop_talking', () => setPhase('listening'));
      client.on('update', (update: { transcript?: Array<{ role: string; content: string }> }) => {
        if (update && Array.isArray(update.transcript)) {
          setTranscript(
            update.transcript.map((item) => ({
              role: item.role === 'agent' ? 'agent' : 'user',
              text: item.content || '',
            }))
          );
        }
      });
      client.on('call_ended', () => hangup('ended'));
      client.on('error', (err: unknown) => {
        const msg = typeof err === 'string' ? err : (err as Error)?.message || '';
        const mic =
          /notallowed|permission|denied/i.test(msg) ||
          (typeof err === 'object' && err !== null && (err as { name?: string }).name === 'NotAllowedError');
        hangup('error', mic ? COPY.micDenied : msg || COPY.genericError);
      });

      await client.startCall({ accessToken });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      const mic = /notallowed|permission|denied/i.test(msg);
      hangup('error', mic ? COPY.micDenied : msg || COPY.genericError);
    }
  }, [audioConsent, hangup, startMicMetering]);

  const toggleMute = useCallback(() => {
    if (!micStreamRef.current) return;
    const tracks = micStreamRef.current.getAudioTracks();
    tracks.forEach((t) => {
      t.enabled = !t.enabled;
    });
    setIsMuted((m) => !m);
  }, []);

  const closeWidget = useCallback(() => {
    if (callActive) hangup('idle');
    setOpen(false);
  }, [callActive, hangup]);

  const openWidget = useCallback(() => {
    setOpen(true);
    setPhase('idle');
    setAudioConsent(false);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ---- focus management -----------------------------------------------------
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const target =
      startBtnRef.current ??
      dialog.querySelector<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
    target?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeWidget();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener('keydown', onKey);
    return () => dialog.removeEventListener('keydown', onKey);
  }, [open, closeWidget]);

  useEffect(() => {
    if (!open && launcherRef.current) launcherRef.current.focus();
  }, [open]);

  // Status text for the aria-live region.
  const statusText =
    phase === 'connecting'
      ? COPY.connecting
      : phase === 'listening'
        ? isMuted
          ? COPY.listeningMuted
          : COPY.listening
        : phase === 'speaking'
          ? COPY.speaking
          : phase === 'ending'
            ? 'Ending call...'
            : phase === 'ended'
            ? COPY.ended
            : phase === 'error'
              ? errorMessage || COPY.genericError
              : '';

  const orbVolume = phase === 'speaking' ? 0.6 : volume;

  return (
    <>
      {/* Floating launcher */}
      <button
        ref={launcherRef}
        type="button"
        className={`va-launcher ${callActive ? 'live' : ''}`}
        onClick={openWidget}
        title={COPY.launcherTooltip}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="va-orb" aria-hidden="true" />
        <span className="va-launcher-text">
          <span className="va-launcher-kicker">AI receptionist</span>
          <span className="va-launcher-cta">{COPY.launcherLabel}</span>
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className={phase === 'unconfigured' ? 'va-backdrop va-backdrop-plain' : 'va-backdrop'}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeWidget();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="va-title"
            aria-describedby="va-desc"
            className="va-dialog"
          >
            <button type="button" className="va-close" onClick={closeWidget} aria-label={COPY.close}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {phase === 'unconfigured' ? (
              /* Honest not-configured state for deployments without the endpoint */
              <div className="va-body">
                <h2 id="va-title" className="va-title">
                  {COPY.unconfiguredTitle}
                </h2>
                <p id="va-desc" className="va-lead">
                  {COPY.unconfiguredBody}
                </p>
                <div className="va-actions">
                  <a className="va-btn primary" href="tel:+18133171539">
                    {COPY.callUs}
                  </a>
                  <button type="button" className="va-btn ghost" onClick={closeWidget}>
                    {COPY.close}
                  </button>
                </div>
              </div>
            ) : (
              <div className="va-body">
                <div className="va-head">
                  <span className="va-badge">
                    <span className={`va-dot ${callActive ? 'live' : ''}`} aria-hidden="true" />
    {callActive ? `SAMPLE · ${formatTime(callDuration)}` : 'BROWSER SAMPLE'}
                  </span>
                  <h2 id="va-title" className="va-title">
                    {COPY.modalTitle}
                  </h2>
                  <p id="va-desc" className="va-lead">
                    {COPY.modalLead}
                  </p>
                </div>

                <div className="va-stage">
                  <div className={`va-halo ${callActive ? 'active' : ''}`} aria-hidden="true" />
                  <React.Suspense fallback={<div className="va-orb-loading" aria-hidden="true" />}>
                    {audioConsent ? (
                      <FluidCloudOrb
                        state={
                          phase === 'error'
                            ? 'error'
                            : phase === 'ended'
                              ? 'idle'
                              : (phase as OrbState)
                        }
                        volume={orbVolume}
                        size={150}
                        title={undefined}
                      />
                    ) : (
                      <div className="va-orb-loading" aria-hidden="true" />
                    )}
                  </React.Suspense>
                </div>

                <p className="va-status" role="status" aria-live="polite">
                  {statusText || (phase === 'idle' ? COPY.idleHint : '')}
                </p>

                {errorMessage && phase === 'error' && (
                  <p className="va-error" role="alert">
                    {errorMessage}
                  </p>
                )}

                {!callActive && (
                  <label className="va-consent">
                    <input
                      type="checkbox"
                      checked={audioConsent}
                      onChange={(event) => setAudioConsent(event.target.checked)}
                    />
                    <span>
                      I agree to send microphone audio to Retell AI to run this sample. Retention and model-use settings are unverified. Starting may create metered usage billed to Client Optimal; the rate and balance are unverified. I will use fictional details only.
                    </span>
                  </label>
                )}

                <div className="va-actions">
                  {phase === 'idle' && (
                    <button ref={startBtnRef} type="button" className="va-btn primary" onClick={startCall} disabled={!audioConsent}>
                      {COPY.start}
                    </button>
                  )}
                  {phase === 'ended' && (
                    <button ref={startBtnRef} type="button" className="va-btn primary" onClick={startCall} disabled={!audioConsent}>
                      {COPY.resume}
                    </button>
                  )}
                  {phase === 'error' && (
                    <button ref={startBtnRef} type="button" className="va-btn primary" onClick={startCall} disabled={!audioConsent}>
                      Try again
                    </button>
                  )}
                  {callActive && (
                    <>
                      <button type="button" className={`va-btn mute ${isMuted ? 'muted' : ''}`} onClick={toggleMute}>
                        {isMuted ? COPY.unmute : COPY.mute}
                      </button>
                      <button type="button" className="va-btn danger" onClick={endCall}>
                        {COPY.end}
                      </button>
                    </>
                  )}
                </div>

                {transcript.length > 0 && (
                  <div className="va-transcript" aria-label="Live transcript">
                    {transcript.slice(-6).map((item, idx) => (
                      <p key={idx} className={`va-row ${item.role}`}>
                        <span className="va-role">{item.role === 'agent' ? 'Agent' : 'You'}</span>
                        <span className="va-text">{item.text}</span>
                      </p>
                    ))}
                  </div>
                )}

                <p className="va-foot">
                  {COPY.privacy}{' '}
                  <a href="/privacy" className="va-tel">
                    Privacy details
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .va-launcher {
          position: fixed;
          right: clamp(0.9rem, 2.5vw, 1.6rem);
          bottom: clamp(0.9rem, 2.5vw, 1.6rem);
          z-index: 9000;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.55rem 0.95rem 0.55rem 0.6rem;
          background: var(--panel);
          color: var(--text);
          border: var(--hair-w) solid var(--hair-2);
          box-shadow: var(--panel-shadow);
          cursor: pointer;
          font-family: var(--font-body);
          transition: border-color var(--t-fast) var(--ease), box-shadow var(--t-fast) var(--ease), transform var(--t-fast) var(--ease);
        }
        .va-launcher:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 22px rgba(37, 99, 235, 0.45);
          transform: translateY(-1px);
        }
        .va-launcher:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .va-orb {
          width: 38px;
          height: 38px;
          flex: none;
          border-radius: 50%;
          background:
            radial-gradient(circle at 32% 30%, rgba(240, 246, 255, 0.95) 0%, rgba(101, 168, 255, 0.9) 28%, #2563eb 62%, #0b2a8a 100%);
          box-shadow:
            0 0 14px rgba(37, 99, 235, 0.55),
            0 0 34px rgba(56, 189, 248, 0.35),
            inset 0 -4px 10px rgba(3, 5, 10, 0.35);
          animation: va-breathe 3.2s ease-in-out infinite alternate;
        }
        .va-launcher.live .va-orb {
          box-shadow:
            0 0 18px rgba(37, 99, 235, 0.85),
            0 0 46px rgba(0, 210, 255, 0.55),
            inset 0 -4px 10px rgba(3, 5, 10, 0.35);
          animation-duration: 1.4s;
        }
        @keyframes va-breathe {
          from { transform: scale(0.96); filter: brightness(0.94); }
          to   { transform: scale(1.05); filter: brightness(1.08); }
        }
        .va-launcher-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
        }
        .va-launcher-kicker {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .va-launcher-cta {
          font-size: 0.86rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .va-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9500;
          background: color-mix(in srgb, var(--bg-2) 78%, transparent);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.6rem, 3vw, 2rem);
        }
        .va-dialog {
          position: relative;
          width: min(30rem, 100%);
          max-height: min(92dvh, 44rem);
          overflow-y: auto;
          background: var(--panel);
          border: var(--hair-w) solid var(--hair-2);
          border-radius: 10px;
          box-shadow: 0 24px 80px rgba(3, 5, 10, 0.5), 0 0 40px var(--glow-accent);
          font-family: var(--font-body);
          color: var(--text);
        }
        .va-backdrop-plain .va-dialog { width: min(24rem, 100%); }
        .va-close {
          position: absolute;
          top: 0.7rem;
          right: 0.7rem;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: var(--hair-w) solid transparent;
          color: var(--muted);
          cursor: pointer;
          transition: color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
        }
        .va-close:hover { color: var(--text); border-color: var(--hair); }
        .va-close:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        .va-body {
          padding: clamp(1.4rem, 4vw, 2.1rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .va-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          border: var(--hair-w) solid var(--hair-2);
          padding: 0.4em 0.75em;
        }
        .va-dot {
          width: 5px;
          height: 5px;
          background: var(--accent-neon);
          box-shadow: 0 0 8px var(--accent-neon);
        }
        .va-dot.live { animation: va-pulse 1.5s infinite; }
        @keyframes va-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.7; }
        }
        .va-title {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 3vw, 1.6rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: var(--ls-h2);
          margin-top: 0.9rem;
        }
        .va-lead {
          font-size: 0.86rem;
          line-height: 1.55;
          color: var(--text-dim);
          margin-top: 0.55rem;
          max-width: 26rem;
        }
        .va-stage {
          position: relative;
          width: 168px;
          height: 168px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
        }
        .va-orb-loading {
          width: 150px;
          height: 150px;
          border: 1px solid var(--hair-2);
          border-radius: 50%;
          background: radial-gradient(circle at 44% 36%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 68%);
        }
        .va-halo {
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 24%, transparent) 0%, transparent 72%);
          opacity: 0.45;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        .va-halo.active {
          opacity: 0.95;
          animation: va-halo 3s ease-in-out infinite alternate;
        }
        @keyframes va-halo {
          from { transform: scale(0.96); opacity: 0.7; }
          to { transform: scale(1.12); opacity: 1; }
        }
        .va-status {
          min-height: 1.4em;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          letter-spacing: 0.06em;
          color: var(--muted);
          margin-top: 0.35rem;
        }
        .va-consent {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          width: 100%;
          max-width: 26rem;
          margin-top: 0.75rem;
          color: var(--text-dim);
          font-size: 0.78rem;
          line-height: 1.5;
          text-align: left;
        }
        .va-consent input {
          flex: none;
          width: 1.1rem;
          height: 1.1rem;
          margin-top: 0.12rem;
          accent-color: var(--accent);
        }
        .va-error {
          font-size: 0.82rem;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 4px;
          padding: 0.45rem 0.8rem;
          max-width: 24rem;
        }
        .va-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          margin-top: 0.9rem;
        }
        .va-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
          font-family: var(--font-mono);
          font-size: var(--step-small);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9em 1.5em;
          border: var(--hair-w) solid var(--hair-2);
          background: none;
          color: var(--text);
          cursor: pointer;
          min-height: 44px;
          transition: background-color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
        }
        .va-btn:hover { border-color: var(--text); }
        .va-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .va-btn.primary {
          background: var(--accent-fill);
          color: var(--accent-fill-ink);
          border-color: var(--accent-fill);
          font-weight: 600;
          clip-path: polygon(
            var(--chamfer) 0, 100% 0,
            100% calc(100% - var(--chamfer)),
            calc(100% - var(--chamfer)) 100%,
            0 100%, 0 var(--chamfer));
        }
        .va-btn.primary:hover {
          filter: brightness(1.08);
          box-shadow: var(--glow-btn);
        }
        .va-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          box-shadow: none;
        }
        .va-btn.mute.muted { color: #ef4444; border-color: #ef4444; }
        .va-btn.danger {
          background: #ef4444;
          border-color: #ef4444;
          color: #ffffff;
        }
        .va-btn.danger:hover { filter: brightness(1.1); }
        .va-transcript {
          width: 100%;
          max-width: 24rem;
          margin-top: 1rem;
          border: var(--hair-w) solid var(--hair);
          background: color-mix(in srgb, var(--bg) 50%, transparent);
          padding: 0.7rem 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          text-align: left;
        }
        .va-row {
          display: flex;
          gap: 0.45rem;
          font-size: 0.82rem;
          line-height: 1.45;
        }
        .va-role {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          flex: none;
          padding-top: 0.12rem;
          color: var(--text-dim);
        }
        .va-row.agent .va-role { color: var(--accent); }
        .va-text { color: var(--text); }
        .va-foot {
          margin-top: 1.1rem;
          padding-top: 0.75rem;
          border-top: var(--hair-w) solid var(--hair);
          width: 100%;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .va-tel { color: var(--accent); text-decoration: none; }
        .va-tel:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .va-launcher { display: none; }
        }
        @media (pointer: coarse) {
          .va-launcher { min-height: 44px; min-width: 44px; }
        }
      `}</style>
    </>
  );
}
