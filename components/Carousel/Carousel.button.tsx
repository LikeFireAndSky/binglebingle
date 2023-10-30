'use client';

import { Button } from '@material-tailwind/react';

import React from 'react';
import { useRouter } from 'next/navigation';

const CarouselButton = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push('/choose');
	};

	return (
		<Button
			type="button"
			className="bg-primary-color w-full"
			onClick={handleClick}
		>
			여행일정 짜러가기
		</Button>
	);
};

export default CarouselButton;
