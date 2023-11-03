'use client';

import * as THREE from 'three';
import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
	Float,
	Line,
	OrbitControls,
	Sphere,
	Stars,
	Trail,
} from '@react-three/drei';

const CanvasRoot = () => {
	return (
		<Canvas camera={{ position: [0, -30, -30] }}>
			<ambientLight intensity={0.5} />
			<perspectiveCamera position={[0, 0, 100]} fov={75} />
			<Float speed={4} rotationIntensity={1} floatIntensity={2}></Float>
			<Stars radius={500} depth={50} count={1000} factor={10} />
			<OrbitControls
				autoRotate
				enablePan={false}
				enableZoom={false}
				maxPolarAngle={Math.PI / 2}
			/>
		</Canvas>
	);
};

export default CanvasRoot;
