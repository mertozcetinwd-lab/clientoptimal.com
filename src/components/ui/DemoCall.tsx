import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import type { OrbState } from './FluidCloudOrb';
import VoiceOrbStill from './VoiceOrbStill';

// The /demo hero call (2026-10-20 redesign). Same Retell flow as VoiceOrb.tsx (POST
// /api/demo/create-web-call, then the browser SDK), laid out as the page's centrepiece: the
// glowing FluidCloudOrb IS the talk button. Mert kept the orb on purpose ("blue glowing
// supernova-ish orb"). The audio notice sits beside the button, so pressing it is the consent;
// the old checkbox was dropped for that reason, not silently.
const FluidCloudOrb = React.lazy(() => import('./FluidCloudOrb'));

const LABEL: Record<OrbState, string> = {
  idle: 'Tap the orb to talk',
  connecting: 'Connecting',
  listening: 'Listening',
  speaking: 'Speaking',
  error: 'Could not connect',
};

function useOrbSize(max: number) {
  const pick = () => (typeof window === 'undefined' ? Math.min(380, max) : Math.round(Math.min(max, window.innerWidth * 0.72)));
  const [size, setSize] = useState(pick);
  useEffect(() => {
    const onResize = () => setSize(pick());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

// `max` caps the orb: 420 on home and /demo, smaller in the compact heroes of inner pages.
export default function DemoCall({ max = 420 }: { max?: number }) {
  const [state, setState] = useState<OrbState>('idle');
  const [volume, setVolume] = useState(0);
  const [line, setLine] = useState<{ role: 'agent' | 'user'; text: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const client = useRef<RetellWebClient | null>(null);
  const timer = useRef<number | null>(null);
  const volTimer = useRef<number | null>(null);
  const size = useOrbSize(max);
  const active = state === 'connecting' || state === 'listening' || state === 'speaking';

  useEffect(() => {
    if (state === 'listening' || state === 'speaking') {
      if (timer.current === null) timer.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [state]);

  useEffect(() => () => {
    if (timer.current !== null) clearInterval(timer.current);
    if (volTimer.current !== null) clearInterval(volTimer.current);
    try { client.current?.stopCall(); } catch { /* page is closing */ }
  }, []);

  const stop = useCallback(() => {
    try { client.current?.stopCall(); } catch { /* already ended */ }
    client.current = null;
    if (volTimer.current !== null) { clearInterval(volTimer.current); volTimer.current = null; }
    setVolume(0);
    setState('idle');
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setLine(null);
    setSeconds(0);
    setState('connecting');
    try {
      const r = await fetch('/api/demo/create-web-call', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await r.json().catch(() => ({}));
      const token = data.access_token || data.accessToken;
      if (!r.ok || !token) throw new Error(data.error || `HTTP ${r.status}`);

      const c = new RetellWebClient();
      client.current = c;
      c.on('call_started', () => setState('listening'));
      c.on('agent_start_talking', () => {
        setState('speaking');
        if (volTimer.current !== null) clearInterval(volTimer.current);
        volTimer.current = window.setInterval(() => {
          const v = (c as unknown as { analyzerComponent?: { calculateVolume?: () => number } })
            .analyzerComponent?.calculateVolume?.();
          setVolume(typeof v === 'number' ? Math.min(1, v * 1.5) : 0.5 + 0.3 * Math.sin(Date.now() / 120));
        }, 50);
      });
      c.on('agent_stop_talking', () => {
        if (volTimer.current !== null) { clearInterval(volTimer.current); volTimer.current = null; }
        setVolume(0);
        setState('listening');
      });
      c.on('update', (u: { transcript?: { role: string; content: string }[] }) => {
        const last = u?.transcript?.[u.transcript.length - 1];
        if (last?.content) setLine({ role: last.role === 'agent' ? 'agent' : 'user', text: last.content });
      });
      c.on('call_ended', () => { client.current = null; setVolume(0); setState('idle'); });
      c.on('error', () => { client.current = null; setState('error'); setError('The call dropped. Try again, or call the number below.'); });
      await c.startCall({ accessToken: token });
    } catch {
      client.current = null;
      setState('error');
      setError('Could not start the call. Check your microphone, or call the number below.');
    }
  }, []);

  const toggle = () => (active ? stop() : start());
  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className={`dc dc--${state}`}>
      <div className="dc-stage" style={{ width: size, height: size }}>
        <div className="dc-halo" aria-hidden="true" />
        <React.Suspense fallback={<VoiceOrbStill size={size} />}>
          <FluidCloudOrb
            state={state}
            volume={volume}
            size={size}
            onClick={toggle}
            title={active ? 'End the demo call' : 'Start the demo call'}
          />
        </React.Suspense>
      </div>

      {/* Shown only once a call starts (Mert: no "tap the orb" label under the idle orb). */}
      <div className="dc-status" aria-live="polite" hidden={state === 'idle'}>
        <span className={`dc-dot ${active ? 'is-live' : ''}`} aria-hidden="true" />
        <span>{LABEL[state]}{active && state !== 'connecting' ? ` · ${mmss}` : ''}</span>
      </div>

      <p className="dc-line" aria-live="polite">
        {line ? <><span>{line.role === 'agent' ? 'Receptionist' : 'You'}</span> {line.text}</> : null}
      </p>

      <button type="button" className={`d-btn ${active ? 'd-btn--glass' : 'd-btn--light'}`} onClick={toggle}>
        {active ? 'End call' : 'Talk to it now'}
      </button>
      {error && <p className="dc-error" role="alert">{error}</p>}
    </div>
  );
}
