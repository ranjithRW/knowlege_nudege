import CubeModel from './CubeModel';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei'; 

const Display = () => {
    return (
        <div className="w-screen h-screen">
            <Canvas 
                style={{ width: '100%', height: '100%' }}
                camera={{ position: [5, 5, 5], fov: 50 }}
                gl={{ alpha: true }} 
                onCreated={({ gl }) => {
                    gl.setClearColor(0x00000000, 0);
                }}
            >
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={0.4} />
                <Environment preset="sunset" />

                <CubeModel scale={3} />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={1}
                    maxDistance={20}                  
                />
            </Canvas>
        </div>
    );
};

export default Display;