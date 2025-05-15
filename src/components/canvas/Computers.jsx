import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const lerp = (start, end, t) => start * (1 - t) + end * t;

const Computers = ({ isMobile }) => {
  const car = useGLTF("./aven/scene.gltf");

  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, -50]);
  const [moveProgress, setMoveProgress] = useState(0);
  const [driftProgress, setDriftProgress] = useState(0);

  const driftRadius = 5;
  const driftSpeed = 0.015;

  useFrame(() => {
    if (moveProgress < 1) {
      const newProgress = Math.min(moveProgress + 0.01, 1);
      setMoveProgress(newProgress);
      const newZ = lerp(-50, 0, newProgress);
      setPosition([0, -1.75, newZ]);
    } else if (driftProgress < 1) {
      const newDrift = Math.min(driftProgress + driftSpeed, 1);
      setDriftProgress(newDrift);
      const angle = newDrift * 2 * Math.PI;
      const x = driftRadius * Math.cos(angle);
      const z = driftRadius * Math.sin(angle);
      setPosition([x, -1.75, z]);
      setRotation([0, angle + Math.PI / 2, 0]);
    } else {
      setPosition([0, -1.75, 0]);
      setRotation((prev) => [prev[0], prev[1] + 0.005, prev[2]]);
    }
  });

  useEffect(() => {
    car.scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.material = new THREE.MeshStandardMaterial({
          color: node.material.color,
          roughness: 0.4,
          metalness: 0.6,
        });
      }
    });
  }, [car]);

  return (
    <group position={position} rotation={rotation}>
      {/* Enhanced lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[0, 30, 15]}
        angle={0.2}
        penumbra={0.7}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[5, 5, 5]} intensity={1} />

      <primitive
        object={car.scene}
        scale={isMobile ? 1.1 : 1.4}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      frameloop="demand"
      camera={{ position: [20, 10, 25], fov: 35 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
