import { Circle, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './CreditCard3D.css';

const AnimatedCard: React.FC<{ gltf: any }> = ({ gltf }) => {
    const cardRef = useRef<any>();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (cardRef.current) {
            cardRef.current.rotation.y = elapsedTime * 0.75; // Adjust speed as needed
        }
    });

    return (
        <primitive
            ref={cardRef}
            object={gltf.scene}
            position={[0, 1, 2]}
        />
    );
};

const CreditCard3D: React.FC = () => {
    const [loading, setLoading] = useState(true);
    let gltf;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    try {
        gltf = useLoader(GLTFLoader, '/credit-card.glb');
    } catch (error) {
        console.error("Error loading GLTF model:", error);
        return <div className="flex items-center justify-center">
            <div className="spinner">
                <div className="spinner1"></div>
            </div>
        </div>;
    }

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <Suspense fallback={<div className="spinner"></div>}>
            <Canvas camera={{ position: [-0.5, 1, 3.5] }}>
                <directionalLight
                    position={[-1.3, 6.0, 4.4]}
                    castShadow
                    intensity={Math.PI * 1}
                />
                <AnimatedCard gltf={gltf} />
                <Circle args={[10]} rotation-x={-Math.PI / 2}>
                    <meshStandardMaterial />
                </Circle>
                <OrbitControls
                    target={[0, 1, 0]}
                    maxPolarAngle={Math.PI / 2 + Math.PI / 12}
                    minPolarAngle={Math.PI / 2 - Math.PI / 12}
                    maxAzimuthAngle={Math.PI / 12}
                    minAzimuthAngle={-Math.PI / 12}
                    enableDamping
                    dampingFactor={0.0009}
                />
            </Canvas>
        </Suspense>
    );
};

export default CreditCard3D;
