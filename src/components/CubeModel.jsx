import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


function CubeModel(props) {
  const { nodes, materials } = useGLTF('/cube.glb');
  const meshRef = useRef();

  // Center the geometry and remove initial rotation
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.center();
    }
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.Object_3.geometry}
        material={materials['Scene_-_Root']}
        rotation={[0, 0, 0]} // Remove initial rotation
        position={[0, 0, 0]}
      />
    </group>
  );
}
useGLTF.preload('/cube.glb');
export default CubeModel;