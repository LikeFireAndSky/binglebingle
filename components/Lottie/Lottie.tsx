'use client';

import React from 'react';
import lottie from 'lottie-web';
import animaionData from '../../public/Polite Chicky.json';

const Lottie = () => {
	console.log('Lottie ON');
	const ref = React.useRef(null);
	React.useEffect(() => {
		if (!ref.current) {
			return;
		}
		const anim = lottie.loadAnimation({
			container: ref.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animaionData,
		});

		return () => anim.destroy(); // optional clean up for unmounting
	}, []);
	return <div ref={ref} className="w-56 h-56"></div>;
};

export default Lottie;
