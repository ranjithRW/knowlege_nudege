import React, { useRef, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function CubeModel(props) {
  const meshRef = useRef();

  // Load the four textures
  const textures = useTexture({
    front: '/front.jpg',    // Front face texture
    back: '/front.jpg',      // Back face texture
    left: '/front.jpg',      // Left face texture
    right: '/front.jpg',    // Right face texture
  });
  

  // Create materials array for each face
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ map: textures.right }), // Right face (+X)
    new THREE.MeshStandardMaterial({ map: textures.left }),  // Left face (-X)
    new THREE.MeshStandardMaterial({ color: 'white' }),       // Top face (+Y)
    new THREE.MeshStandardMaterial({ color: 'white' }),       // Bottom face (-Y)
    new THREE.MeshStandardMaterial({ map: textures.front }), // Front face (+Z)
    new THREE.MeshStandardMaterial({ map: textures.back }),  // Back face (-Z)
  ], [textures]);

  return (
    <mesh ref={meshRef} {...props} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default CubeModel;