'use client';

import React from 'react';
import Lottie from 'react-lottie-player';
import animaionData from '../../public/Polite Chicky.json';

const HomeAnimation = React.memo(() => {
	return <Lottie loop animationData={animaionData} play />;
});

export default HomeAnimation;
