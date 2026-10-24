"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: Record<string, any>;
  materials: Record<string, any>;
};

export default function Scene(props: React.ComponentProps<"group">) {
  const { scene } = useGLTF("/models/model.glb") as GLTFResult;

  return (
    <group {...props}>
      <primitive
        object={scene}
        scale={6}
        position={[-4, -2.5, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/model.glb");