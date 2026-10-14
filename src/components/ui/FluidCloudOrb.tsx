import React, { useEffect, useRef } from 'react';
import VoiceOrbStill from './VoiceOrbStill';

export type OrbState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';

// An original audio-reactive cloud field in Client Optimal's existing blue palette.
// The SVG beneath the canvas remains visible if WebGL is unavailable.
export function FluidCloudOrb({
  state,
  volume,
  onClick,
  size = 250,
  title,
}: {
  state: OrbState;
  volume: number;
  onClick?: () => void;
  size?: number;
  title?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef(state);
  const volumeRef = useRef(volume);
  const refreshRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    stateRef.current = state;
    volumeRef.current = volume;
    refreshRef.current?.();
  }, [state, volume]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
      });
    } catch {
      return;
    }
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
        vec2 warped = p + (warp - 0.5) * (1.18 + u_activity * 0.38)
          + curl * (0.035 + u_activity * 0.07);
        float broad = fbm(warped * 0.92 + vec2(t * 0.14, -t * 0.18));
        float folded = fbm(warped * 1.66 + vec2(-t * 0.23, t * 0.19) + 5.2);
        float field = mix(broad, folded, 0.3 + u_activity * 0.14);

        float horizon = 0.46 + 0.08 * sin((uv.x + warp.x * 0.2) * 5.4 + t * 0.42)
          + 0.16 * (broad - 0.5);
        float upper = smoothstep(horizon - 0.12, horizon + 0.08, uv.y);
        float band = exp(-pow((uv.y - horizon) * (5.2 + u_activity * 0.8), 2.0));
        float cloud = smoothstep(0.24, 0.79, field);

        // Restore the original animated arctic-blue supernova palette from the older orb.
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

    const createShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = createShader(gl.VERTEX_SHADER, vsSource);
    const fragment = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const pixels = Math.round(size * dpr);
    canvas.width = pixels;
    canvas.height = pixels;
    gl.viewport(0, 0, pixels, pixels);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, 'a_position');
    const resolution = gl.getUniformLocation(program, 'u_resolution');
    const time = gl.getUniformLocation(program, 'u_time');
    const activity = gl.getUniformLocation(program, 'u_activity');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    if (resolution) gl.uniform2f(resolution, pixels, pixels);

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionPreference.matches;
    let inView = true;
    let pageVisible = document.visibilityState !== 'hidden';
    let frameId: number | null = null;
    let lastFrame: number | null = null;
    let lastReducedRender = 0;
    let elapsed = 0;
    let currentActivity = 0.14;

    const render = (now: number) => {
      if (lastFrame !== null) {
        elapsed += Math.min(Math.max(now - lastFrame, 0), 100) / 1000;
      }
      lastFrame = now;

      const rawVolume = Number.isFinite(volumeRef.current) ? volumeRef.current : 0;
      const level = Math.max(0, Math.min(1, rawVolume));
      const currentState = stateRef.current;
      const targetActivity = currentState === 'speaking'
        ? Math.max(0.42, level)
        : currentState === 'listening'
          ? Math.max(0.24, level)
          : currentState === 'connecting'
            ? 0.3
            : 0.14;
      currentActivity += (targetActivity - currentActivity) * (reducedMotion ? 1 : 0.12);

      // Reduced motion keeps the colors gently drifting rather than freezing the orb completely.
      const motionSpeed = reducedMotion ? 0.64 : 0.75 + currentActivity * 0.7;
      if (time) gl!.uniform1f(time, elapsed * motionSpeed);
      if (activity) gl!.uniform1f(activity, currentActivity);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    };

    const stop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      lastFrame = null;
      lastReducedRender = 0;
    };

    const frame = (now: number) => {
      frameId = null;
      if (!inView || !pageVisible) return;
      if (!reducedMotion || now - lastReducedRender >= 33) {
        render(now);
        if (reducedMotion) lastReducedRender = now;
      }
      frameId = requestAnimationFrame(frame);
    };

    const schedule = () => {
      if (frameId === null && inView && pageVisible) {
        frameId = requestAnimationFrame(frame);
      }
    };

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState !== 'hidden';
      if (pageVisible) schedule();
      else stop();
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      stop();
      schedule();
    };

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) schedule();
        else stop();
      }, { rootMargin: '48px' });
      observer.observe(canvas);
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    motionPreference.addEventListener('change', onMotionChange);
    refreshRef.current = schedule;
    schedule();

    return () => {
      refreshRef.current = null;
      stop();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionPreference.removeEventListener('change', onMotionChange);
      gl!.deleteBuffer(buffer);
      gl!.deleteProgram(program);
      gl!.deleteShader(vertex);
      gl!.deleteShader(fragment);
    };
  }, [size]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    onClick();
  };

  return (
    <div
      className="fluid-orb"
      style={{ width: size, height: size }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? title : undefined}
      aria-hidden={onClick ? undefined : true}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <VoiceOrbStill size={size} />
      <canvas ref={canvasRef} className="fluid-orb__canvas" aria-hidden="true" />
    </div>
  );
}

export default FluidCloudOrb;
