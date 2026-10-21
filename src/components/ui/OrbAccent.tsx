import React from 'react';
import FluidCloudOrb from './FluidCloudOrb';

// A quiet, non-interactive copy of the demo orb for the closing panel on /demo, so the page ends
// where it started. aria-hidden comes from FluidCloudOrb itself when there is no onClick.
export default function OrbAccent({ size = 200 }: { size?: number }) {
  return (
    <div className="d-orb-accent" style={{ width: size, height: size }}>
      <div className="dc-halo" aria-hidden="true" />
      <FluidCloudOrb state="idle" volume={0} size={size} />
    </div>
  );
}
