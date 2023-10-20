'use client';

import React from 'react';
import { Carousel, IconButton } from '@material-tailwind/react';
import {
	ArrowSmallLeftIcon,
	ArrowSmallRightIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const CarouselCustomArrows = (data: any) => {
	const result = data.data.data;
	return (
		<Carousel
			className="rounded-xl h-48 w-full max-w-3xl relative sm:h-96"
			prevArrow={({ handlePrev }) => (
				<IconButton
					variant="text"
					color="white"
					size="sm"
					onClick={handlePrev}
					className="absolute top-2/4 left-4 -translate-y-2/4"
				>
					<ArrowSmallLeftIcon className="h-3 w-3 sm:h-6 sm:w-6" />
				</IconButton>
			)}
			nextArrow={({ handleNext }) => (
				<IconButton
					variant="text"
					color="white"
					size="sm"
					onClick={handleNext}
					className="absolute top-2/4 !right-4 -translate-y-2/4"
				>
					<ArrowSmallRightIcon className="h-3 w-3 sm:h-6 sm:w-6" />
				</IconButton>
			)}
		>
			{result &&
				result.map((item: any, index: number) => {
					return (
						<Image
							key={index}
							src={item.image}
							alt={item.title}
							priority={true}
							className="rounded-xl object-cover w-full h-full"
						/>
					);
				})}
		</Carousel>
	);
};

export default CarouselCustomArrows;
