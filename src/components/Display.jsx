import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import CubeModel from './CubeModel';

const SmoothCube = ({ targetRotation }) => {
  return (
    <CubeModel
      rotationY={targetRotation}
      position={[0.4, 0.4, 0]}
      scale={2.6}
    />
  );
};

const Display = () => {
  const scrollContainerRef = useRef();
  const [targetRotation, setTargetRotation] = useState(0);

  const paragraphData = [
    {
      title: "Email first delivery",
      content: "Nudges arrive directly in your team’s inbox — no login or platform fatigue."
    },
    {
      title: "AI powered Feedback", 
      content: "Every answer is evaluated in real time against your org’s knowledge base."
    },
    {
      title: "Conversational Learning",
      content: "Users respond like they’re chatting, not testing."
    },
    {
      title: "Spaced repetition and reinforcement",
      content: "Key concepts are revisited intelligently, boosting retention."
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;

      const sectionCount = paragraphData.length;
      const sectionHeight = scrollHeight / sectionCount;
      const sectionIndex = Math.min(Math.floor(scrollTop / sectionHeight), sectionCount - 1);

      const newRotation = sectionIndex * (Math.PI / 5); // Rotate 90° per section
      setTargetRotation(newRotation);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [paragraphData.length]);

  return (
    <div className="flex w-screen h-screen">
      {/* Left Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="w-1/2 p-8 overflow-y-auto scroll-smooth"
      >
        <h2 className="text-3xl font-bold mb-6">Cube Information</h2>
        <div className="space-y-20">
          {paragraphData.map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-lg shadow-md min-h-[300px] flex flex-col justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">{item.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{item.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                Face {index + 1} of 4
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right 3D Canvas */}
      <div className="w-1/2 h-full">
        <Canvas
          camera={{ position: [3, 2, 5], fov: 50 }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x00000000, 0)}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <Environment preset="city" />
          <SmoothCube targetRotation={targetRotation} />
          <OrbitControls enabled={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default Display;
