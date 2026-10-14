import { useId } from 'react';

export default function VoiceOrbStill({ size = 250 }: { size?: number }) {
  const id = `voice-orb-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      className="voice-orb-still"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-sphere`} cx="32%" cy="29%" r="82%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="43%" stopColor="#0284c7" />
          <stop offset="76%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#09162e" />
        </radialGradient>
        <radialGradient id={`${id}-cyan-cloud`} cx="32%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#d9f5ff" stopOpacity="0.95" />
          <stop offset="44%" stopColor="#38bdf8" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-azure-cloud`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="54%" stopColor="#1d4ed8" stopOpacity="0.58" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-bloom`} x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <clipPath id={`${id}-edge`}>
          <circle cx="100" cy="100" r="94" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="88" fill="#0284c7" opacity="0.52" filter={`url(#${id}-bloom)`} />
      <g clipPath={`url(#${id}-edge)`}>
        <circle cx="100" cy="100" r="94" fill={`url(#${id}-sphere)`} />
        <ellipse cx="72" cy="72" rx="59" ry="48" fill={`url(#${id}-cyan-cloud)`} filter={`url(#${id}-soft)`} />
        <ellipse cx="135" cy="126" rx="67" ry="52" fill={`url(#${id}-azure-cloud)`} filter={`url(#${id}-soft)`} />
        <ellipse cx="91" cy="146" rx="52" ry="31" fill={`url(#${id}-cyan-cloud)`} opacity="0.68" filter={`url(#${id}-soft)`} />
        <ellipse cx="130" cy="59" rx="42" ry="29" fill="#d9f5ff" opacity="0.25" filter={`url(#${id}-soft)`} />
      </g>
    </svg>
  );
}
