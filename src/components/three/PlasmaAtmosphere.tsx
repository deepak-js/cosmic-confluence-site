import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

// FBM nebula shader. Scroll progress shifts hue + flow.
const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uRes;

  // Simplex-ish noise (Ashima/IQ inspired, compact)
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865, 0.366025403, -0.577350269, 0.024390243);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0*fract(p*C.www)-1.0;
    vec3 h = abs(x)-0.5; vec3 ox = floor(x+0.5); vec3 a0 = x-ox;
    m *= 1.79284291 - 0.85373472*(a0*a0+h*h);
    vec3 g; g.x = a0.x*x0.x+h.x*x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  float fbm(vec2 p){
    float v=0.0, a=0.5;
    for(int i=0;i<5;i++){ v += a*snoise(p); p*=2.02; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x/uRes.y, 1.0);
    float t = uTime * 0.04;

    // Two layers of slow drift
    vec2 q = vec2(fbm(p*1.4 + vec2(t, -t*0.6)), fbm(p*1.4 + vec2(-t*0.7, t)));
    vec2 r = vec2(fbm(p*2.2 + 2.0*q + vec2(1.7,9.2) + t),
                  fbm(p*2.2 + 2.0*q + vec2(8.3,2.8) - t));
    float f = fbm(p*1.8 + 3.0*r);

    // Palette: deep navy -> violet -> fuchsia -> cyan, scroll-shifted
    float hueShift = uScroll * 0.45;
    vec3 c1 = vec3(0.05, 0.02, 0.10);                       // base navy/black
    vec3 c2 = vec3(0.40 + 0.2*hueShift, 0.10, 0.85);        // violet
    vec3 c3 = vec3(0.91, 0.47, 0.98);                       // fuchsia
    vec3 c4 = vec3(0.13, 0.83 - 0.2*hueShift, 0.93);        // cyan

    vec3 col = mix(c1, c2, smoothstep(-0.4, 0.5, f));
    col = mix(col, c3, smoothstep(0.25, 0.85, f + 0.4*r.x));
    col = mix(col, c4, smoothstep(0.55, 1.1, length(r)*0.9));

    // Radial vignette toward edges
    float d = length(p);
    col *= smoothstep(1.25, 0.25, d);

    // Subtle scanline + grain
    col += 0.015 * sin(uv.y * uRes.y * 1.5);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function NebulaPlane({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state) => {
    if (!mat.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uScroll.value += (scrollRef.current - uniforms.uScroll.value) * 0.05;
    const size = state.size;
    uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={VERT} fragmentShader={FRAG} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

export function PlasmaAtmosphere() {
  const scroll = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onScroll = () => {
      const h = document.documentElement;
      scroll.current = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduced) return null;

  return (
    <div aria-hidden className="fixed inset-0 -z-50 pointer-events-none" style={{ background: "#050508" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.42 }}>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
          dpr={[1, 1.25]}
          style={{ width: "100%", height: "100%" }}
        >
          <NebulaPlane scrollRef={scroll} />
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.55} luminanceThreshold={0.5} luminanceSmoothing={0.4} mipmapBlur />
            <Vignette eskil={false} offset={0.15} darkness={0.9} />
          </EffectComposer>
        </Canvas>
      </div>
      {/* Darken + grain overlays so foreground content stays legible */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(5,5,8,0.35) 0%, rgba(5,5,8,0.85) 80%)" }} />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.7) 0 1px, transparent 1px 3px)",
        }}
      />
    </div>
  );
}

export default PlasmaAtmosphere;

