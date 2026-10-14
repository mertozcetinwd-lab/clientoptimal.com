import React, { useRef, useEffect } from 'react';

// The Fluid Cloud orb, extracted verbatim from VoiceOrb.tsx (2026-09-19) so the
// floating VoiceAgentWidget launcher and the /demo card can share one shader
// implementation instead of two drifting copies. WebGL Fluid Cloud Shader Orb
// (Siri / Hume / Apple Intelligence aesthetic), strict tokens.css discipline.

export type OrbState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';

// Self-contained WebGL Fluid Cloud Shader Orb
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
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 8px 36px rgba(37, 99, 235, 0.32), 0 0 40px rgba(56, 189, 248, 0.25)',
        display: 'block',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      title={title}
    />
  );
}

export default FluidCloudOrb;
