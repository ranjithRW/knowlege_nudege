import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// CubeModel component with rotation control
function CubeModel({ rotationY, ...props }) {
  const meshRef = useRef();

  // Load the four textures
  const textures = useTexture({
    front: '/01.png',
    back: '/02.png',
    left: '/03.png',
    right: '/04.png',
  });

  // Create materials array for each face
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ map: textures.right }), // Right face (+X)
    new THREE.MeshStandardMaterial({ map: textures.left }),  // Left face (-X)
    new THREE.MeshStandardMaterial({ color: '#ffffff' }),       // Top face (+Y)
    new THREE.MeshStandardMaterial({ color: '#ffffff' }),       // Bottom face (-Y)
    new THREE.MeshStandardMaterial({ map: textures.front }), // Front face (+Z)
    new THREE.MeshStandardMaterial({ map: textures.back }),  // Back face (-Z)
  ], [textures]);

  // Update rotation based on scroll
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotationY,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} {...props} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default CubeModel