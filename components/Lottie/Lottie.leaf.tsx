'use client';

import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/public/lottie/falling.json';

const CarouselAnimation = React.memo(() => {
	return <Lottie loop animationData={animationData} play />;
});

export default CarouselAnimation;
