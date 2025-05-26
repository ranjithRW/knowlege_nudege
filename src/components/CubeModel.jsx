import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function CubeModel({ rotationY, ...props }) {
  const meshRef = useRef();

  // Load 4 textures
  const textures = useLoader(TextureLoader, [
    '/04.png', // front
    '/03.png', // back
    '/03.png', // left
    '/04.png'  // right
  ]);

  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ map: textures[3] }), // Right (+X)
    new THREE.MeshStandardMaterial({ map: textures[2] }), // Left (-X)
    new THREE.MeshStandardMaterial({ color: '#ffffff' }), // Top (+Y)
    new THREE.MeshStandardMaterial({ color: '#ffffff' }), // Bottom (-Y)
    new THREE.MeshStandardMaterial({ map: textures[0] }), // Front (+Z)
    new THREE.MeshStandardMaterial({ map: textures[1] }), // Back (-Z)
  ], [textures]);

  // Smoothly update rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += (rotationY - meshRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} {...props} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default CubeModel;