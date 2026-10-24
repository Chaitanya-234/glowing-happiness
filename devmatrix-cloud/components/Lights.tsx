"use client";

import { Environment } from "@react-three/drei";

export default function Lights() {
  return (
    <>
      {/* Ambient Light - base lighting */}
      <ambientLight intensity={0.8} />

      {/* Key Light - Cyan from front-right */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        color="#00f0ff"
      />

      {/* Fill Light - Pink from left */}
      <pointLight
        position={[-5, 2, 3]}
        intensity={1.5}
        color="#ff00e5"
      />

      {/* Rim Light - Purple from back */}
      <pointLight
        position={[0, 3, -5]}
        intensity={1.2}
        color="#b300ff"
      />

      {/* Top Spotlight */}
      <spotLight
        position={[0, 10, 0]}
        intensity={1.5}
        angle={0.5}
        penumbra={1}
      />

      {/* Bottom Light - Cyan accent */}
      <pointLight
        position={[0, -5, 2]}
        intensity={0.8}
        color="#00f0ff"
      />

      {/* Environment for reflections */}
      <Environment preset="city" environmentIntensity={0.5} />
    </>
  );
}