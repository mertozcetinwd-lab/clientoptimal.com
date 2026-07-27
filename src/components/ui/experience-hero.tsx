import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import '../../styles/tailwind.css';

// 3D hero, adapted from a 21st.dev "experience-hero" for Client Optimal.
// Changes from the source: honest Client Optimal copy (no invented metrics),
// azure brand tint on the shader + light + live dot, and the WebGL canvas is
// ABSOLUTE within the hero section rather than fixed over the whole page (this
// site has many sections below the hero).

const LINKEDIN = 'https://www.linkedin.com/in/mert-ozcetin/';

const PALETTE = {
  dark: {
    accent: '#3f7dff',
    monolith: '#0a0c12',
    shaderBase: new THREE.Color(0.004, 0.006, 0.012),
    shaderPeak: new THREE.Color(0.03, 0.05, 0.11),
  },
  light: {
    accent: '#1657c9',
    monolith: '#ffffff',
    shaderBase: new THREE.Color(0.975, 0.98, 0.985),
    shaderPeak: new THREE.Color(0.96, 0.97, 0.98),
  },

};

const LiquidBackground = ({ theme }: { theme: 'dark' | 'light' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const colors = PALETTE[theme];
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uBase: { value: colors.shaderBase.clone() },
      uPeak: { value: colors.shaderPeak.clone() },
    }),
    [colors.shaderBase, colors.shaderPeak]
  );

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      mat.uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse;
          uniform vec3 uBase; uniform vec3 uPeak;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            // faint azure glow instead of neutral grey, to tie into the brand
            gl_FragColor = vec4(mix(uBase, uPeak, color), 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Monolith = ({ theme }: { theme: 'dark' | 'light' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  // Light mode needs a matte, nearly-background object so the monolith doesn't
  // read as a dark blob over the headline. Dark mode keeps the chrome sculpture.
  const isDark = theme === 'dark';
  const mat = isDark
    ? { color: PALETTE.dark.monolith, metalness: 1.0, roughness: 0.05, distort: 0.4, emissive: '#000000', emissiveIntensity: 0 }
    : { color: PALETTE.light.monolith, metalness: 0, roughness: 0.95, distort: 0.15, emissive: '#ffffff', emissiveIntensity: 0.35 };
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial
          color={mat.color}
          speed={4}
          distort={mat.distort}
          roughness={mat.roughness}
          metalness={mat.metalness}
          emissive={mat.emissive}
          emissiveIntensity={mat.emissiveIntensity}
        />
      </mesh>
    </Float>
  );
};

const cells = [
  { id: '001', title: 'AVAILABILITY', val: 'Open', type: 'progress' as const },
  { id: '002', title: 'WHAT I BUILD', type: 'data' as const,
    rows: [ ['Automations', 'Agents'], ['Systems', 'Tools'] ] },
  { id: '003', title: 'HOW I WORK', type: 'text' as const },
];

function useSiteTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const read = () => setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    read();
    window.addEventListener('themechange', read);
    return () => window.removeEventListener('themechange', read);
  }, []);

  return theme;
}

export const Component = () => {
  const theme = useSiteTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { filter: 'blur(24px)', opacity: 0, scale: 1.02 },
        {
          filter: 'blur(0px)', opacity: 1, scale: 1, duration: 1.6, ease: 'expo.out',
          onComplete: () => {
            if (revealRef.current) revealRef.current.style.filter = 'none';
          },
        }
      );

      gsap.from('.command-cell', {
        x: 60, opacity: 0, stagger: 0.1, duration: 1.5, ease: 'power4.out', delay: 1, clearProps: 'all',
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
        if (dist < 150) {
          gsap.to(ctaRef.current, {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.4,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.4,
            duration: 0.6,
          });
        } else {
          gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        }
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[var(--bg)] flex flex-col overflow-hidden"
      style={{ '--hero-accent': PALETTE[theme].accent } as React.CSSProperties}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={theme === 'dark' ? 0.4 : 1.2} />
          <spotLight
            position={[50, 50, 50]}
            intensity={theme === 'dark' ? 3 : 0.8}
            color={theme === 'dark' ? PALETTE.dark.accent : '#ffffff'}
          />
          <LiquidBackground theme={theme} />
          <Monolith theme={theme} />
        </Canvas>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 w-full flex flex-col md:flex-row p-8 md:p-14 lg:p-28 min-h-screen items-center md:items-stretch gap-14"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-12 md:pb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="relative w-2.5 h-2.5 rounded-full bg-[var(--hero-accent)]">
              <div className="absolute inset-0 rounded-full animate-ping opacity-40 bg-[var(--hero-accent)]" />
            </div>
            <span className="font-mono text-[clamp(12px,1vw,15px)] font-bold text-[var(--text)] tracking-[0.2em] uppercase">AI Consulting Agency</span>
          </div>

          <div className="max-w-4xl lg:-translate-y-8 pr-12">
            <h1 className="text-[clamp(4.5rem,11vw,15rem)] font-black leading-[0.86] tracking-tighter text-[var(--text)] uppercase">
              Client <br /> <span className="text-outline">Optimal</span>
            </h1>
            {/* .hero-lede, not mt-14: Tailwind margin utilities are dead in this
                island (tokens.css's unlayered `* { margin: 0 }` outranks @layer).
                See the note in tailwind.css. */}
            <p className="hero-lede font-mono text-[clamp(12px,1.05vw,17px)] text-[var(--muted)] uppercase tracking-[0.35em] max-w-lg leading-relaxed">
              Automations, agents, and internal tools. Built end to end and shipped to run on their own.
            </p>
          </div>

          <a
            ref={ctaRef}
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex items-center gap-6 group lg:-translate-y-20 no-underline"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--hair)] flex items-center justify-center group-hover:bg-[var(--text)] transition-all duration-500 overflow-hidden">
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="stroke-[var(--text)] group-hover:stroke-[var(--bg)] transition-colors duration-500"
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[clamp(12px,1vw,15px)] font-bold text-[var(--text)] uppercase tracking-[0.2em]">Start a conversation</span>
          </a>
        </div>

        <div className="w-full md:w-[26rem] lg:w-[32rem] flex-shrink-0 flex flex-col gap-6 justify-center z-20">
          {cells.map((item) => (
            <div key={item.id} className="command-cell glass-panel p-8 sm:p-9 block">
              <span className="font-mono text-[clamp(10px,0.85vw,13px)] text-[var(--muted)] uppercase tracking-widest block mb-3">
                {item.id} // {item.title}
              </span>
              {item.type === 'progress' ? (
                <div className="flex justify-between items-end mt-2">
                  <h4 className="text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tighter">{item.val}</h4>
                  {/* One bar, one third of the track, sweeping right the way through.
                      It used to be a static 45% azure block with a second azure bar
                      sliding inside it, which read as "fill, then snap". */}
                  <div className="h-[2px] w-20 bg-[var(--hair)] rounded-full overflow-hidden">
                    <div className="h-full w-1/3 rounded-full animate-loading bg-[var(--hero-accent)]" />
                  </div>
                </div>
              ) : item.type === 'data' ? (
                <div className="mt-4 flex flex-col gap-3">
                  {item.rows!.map((r, i) => (
                    <React.Fragment key={i}>
                      <div className="flex justify-between text-[clamp(11px,0.95vw,14px)] font-mono text-[var(--text-dim)]">
                        <span>{r[0]}</span>
                        <span>{r[1]}</span>
                      </div>
                      {i < item.rows!.length - 1 && <div className="h-[1px] w-full bg-[var(--hair)]" />}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <h3 className="text-[clamp(14px,1.1vw,19px)] font-medium text-[var(--text-dim)] mt-3 leading-snug">
                  Remote, <span className="italic text-[var(--text)]">end to end</span>. Built to run on its own, not demoed once.
                </h3>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bento-mask opacity-10 z-[60]" />
    </section>
  );
};

export default Component;
