'use client';

import React from 'react';
import { Carousel, IconButton } from '@material-tailwind/react';
import {
	ArrowSmallLeftIcon,
	ArrowSmallRightIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import image0 from '@/public/images/0.jpg';
import image1 from '@/public/images/1.jpg';
import image2 from '@/public/images/2.jpg';

const CarouselCustomArrows = () => {
	return (
		<Carousel
			className="rounded-xl h-96 w-full relative"
			prevArrow={({ handlePrev }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handlePrev}
					className="absolute top-2/4 left-4 -translate-y-2/4"
				>
					<ArrowSmallLeftIcon className="h-6 w-6" />
				</IconButton>
			)}
			nextArrow={({ handleNext }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handleNext}
					className="absolute top-2/4 !right-4 -translate-y-2/4"
				>
					<ArrowSmallRightIcon className="h-6 w-6" />
				</IconButton>
			)}
		>
			<Image
				src={image0}
				alt="image 1"
				className="h-full w-full object-cover"
			/>
			<Image
				src={image1}
				alt="image 2"
				className="h-full w-full object-cover"
			/>
			<Image
				src={image2}
				alt="image 3"
				className="h-full w-full object-cover"
			/>
		</Carousel>
	);
};

export default CarouselCustomArrows;
