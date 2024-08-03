import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const lerp = (start, end, t) => start * (1 - t) + end * t;

const Computers = ({ isMobile }) => {
  const car = useGLTF('./aven/scene.gltf');
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, -20]); // Start from far away
  const [moveProgress, setMoveProgress] = useState(0); // Progress of movement

  useFrame(() => {
    if (moveProgress < 1) {
      setMoveProgress((prev) => Math.min(prev + 0.01, 1)); // Increment progress
      const newZ = lerp(-20, 0, moveProgress); // Lerp position
      setPosition([0, -1.75, newZ]);
    } else {
      setRotation((prev) => [prev[0], prev[1] + 0.01, prev[2]]); // Slow rotation
    }
  });

  return (
    <mesh position={position} rotation={rotation}>
      <hemisphereLight intensity={0.35} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2} // Increased intensity
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[10, 10, 10]} intensity={2} /> {/* Increased intensity */}
      <pointLight position={[-10, -10, -10]} intensity={1} /> {/* Additional light for balance */}
      <primitive
        object={car.scene}
        scale={isMobile ? 0.75 : 1} // Adjusted scale for a larger size
        rotation={[0, -Math.PI / 2, 0]} // Adjusted rotation for better viewing angle
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [5, 2, 10], fov: 35 }} // Adjusted camera position and FOV
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
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
