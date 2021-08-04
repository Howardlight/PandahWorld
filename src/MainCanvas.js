import React, { useRef, useState, Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { softShadows, OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Vignette,
  SMAA,
} from "@react-three/postprocessing";

import ApandahMesh from "./ApandahMesh";

// Softens the Shadows
softShadows();

const MainCanvas = ({visibility}) => {
  return (
    <Canvas shadows colorManagement camera={{ position: [-5, 2, 10], fov: 60 }}>
      <ambientLight intensity={0.2} />

      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />

      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" opacity={0.3} />
          <meshStandardMaterial attach="material" color={"#FFCAF6"} />
        </mesh>

        <Suspense fallback={null}>
          { visibility ? <ApandahMesh position={[0, 1, 0]} args={[2, 2, 2]} /> : ""}

          <EffectComposer multisampling={0}>
            <SMAA preset={2} />
          </EffectComposer>
        </Suspense>
      </group>

      <EffectComposer>
        <DepthOfField
          focusDisctance={1}
          focalLength={0.07}
          bokehScale={3}
          height={480}
        />
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        <Noise opacity={0.02} />
        {/* <Vignette eskil={false} offset={0.05} darkness={1.1} /> */}
      </EffectComposer>
      <OrbitControls />
    </Canvas>
  );
};

export default MainCanvas;