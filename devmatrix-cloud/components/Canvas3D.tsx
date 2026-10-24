"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Scene from "./Scene";

export default function Canvas3D() {
  return (
    <Canvas
      camera={{
        position: [-1, 0, 10],
        fov: 45
      }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* LIGHTING */}
      <ambientLight intensity={0.7} />

      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#00f0ff" />

      <pointLight position={[-5, 2, 3]} intensity={2} color="#ff00e5" />

      <pointLight position={[0, 3, -5]} intensity={1.5} color="#b300ff" />

      <spotLight position={[0, 10, 0]} intensity={2} angle={0.6} penumbra={1} />

      <pointLight position={[0, -5, 2]} intensity={1.2} color="#00f0ff" />

      <pointLight position={[-8, 0, -3]} intensity={1.5} color="#b300ff" />

      {/* Your 3D Model */}
      <Scene />

      {/* Mouse Controls */}
      <OrbitControls
        target={[-4, -1, 0]}
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={8}
        maxDistance={15}
        maxPolarAngle={Math.PI * 0.9}
        minPolarAngle={Math.PI * 0.1}
        enableDamping={true}
        dampingFactor={0.05}
      />

      {/* Environment */}
      <Environment preset="city" environmentIntensity={0.4} />
    </Canvas>
  );
}