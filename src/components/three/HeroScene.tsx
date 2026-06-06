import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ORB_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vPos;
  uniform float uTime;

  // hash-based 3d noise
  vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 mod289(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main(){
    vec3 pos = position;
    float n = snoise(pos * 1.6 + vec3(uTime*0.25));
    float n2 = snoise(pos * 3.2 - vec3(uTime*0.18));
    float disp = 0.28 * n + 0.12 * n2;
    pos += normal * disp;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vN = normalize(normalMatrix * normal);
    vPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const ORB_FRAG = /* glsl */ `
  varying vec3 vN;
  varying vec3 vPos;
  uniform float uTime;
  void main(){
    vec3 viewDir = normalize(-vPos);
    float fres = pow(1.0 - max(dot(vN, viewDir), 0.0), 2.5);
    // palette: fuchsia -> violet -> cyan
    vec3 cA = vec3(0.91, 0.47, 0.98);
    vec3 cB = vec3(0.65, 0.55, 0.98);
    vec3 cC = vec3(0.13, 0.83, 0.93);
    float t = 0.5 + 0.5 * sin(uTime*0.6 + vPos.y*1.5);
    vec3 base = mix(cA, cB, t);
    vec3 rim = mix(cB, cC, fres);
    vec3 col = mix(base*0.18, rim, fres);
    // inner glow
    col += 0.18 * (1.0 - fres) * cA;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function PlasmaOrb({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((s, dt) => {
    if (!mesh.current) return;
    uniforms.uTime.value = s.clock.elapsedTime;
    const target = pointer.current;
    mesh.current.rotation.y += dt * 0.15 + target.x * dt * 0.4;
    mesh.current.rotation.x += target.y * dt * 0.4;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.2, 64]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={ORB_VERT} fragmentShader={ORB_FRAG} />
    </mesh>
  );
}

function ParticleField() {
  const N = 1800;
  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // sphere shell distribution
      const r = 2.4 + Math.random() * 4.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.04;
      ref.current.rotation.x += dt * 0.01;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#A78BFA" size={0.018} sizeAttenuation depthWrite={false} opacity={0.85} />
    </Points>
  );
}

export function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      style={{ width: "100%", height: "100%" }}
      onPointerMove={(e) => {
        const r = (e.target as HTMLElement).getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
        pointer.current.y = ((e.clientY - r.top) / r.height - 0.5) * 1.2;
      }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={1.4} color="#E879F9" />
      <pointLight position={[-3, -2, 2]} intensity={1.0} color="#22D3EE" />
      <PlasmaOrb pointer={pointer} />
      <ParticleField />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

export default HeroScene;
