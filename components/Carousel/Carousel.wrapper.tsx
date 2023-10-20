import React from 'react';
import CarouselTransition from '@/components/Carousel/Carousel';
import CarouselAnimation from '@/components/Lottie/Lottie.leaf';
import CarouselButton from './Carousel.button';
import { textWeb, textMobile } from './Carousel.text';

const CarouselWrapper = (data: any) => {
	const getMonth = () => {
		const date = new Date();
		const month = date.getMonth() + 1;
		return month;
	};

	return (
		<div className="w-full max-w-7xl justify-between flex flex-col lg:flex-row gap-4 p-5 box-border border-2 rounded-lg border-primary-color">
			<CarouselTransition data={data} />
			<div
				id="여행정보 보여주기"
				className="flex w-full flex-col relative lg:w-2/5"
			>
				<div className="absolute inset-0 w-full -z-10 object-cover overflow-hidden">
					<CarouselAnimation />
				</div>
				<h1 className="text-lg sm:text-2xl mb-3 font-['Taebaek']">
					<strong className="text-3xl font-normal">
						&quot;{getMonth()}월&quot;
					</strong>
					에<br /> 어디를 가볼까요?
				</h1>
				<p className="hidden md:block">{textWeb}</p>
				<p className="block md:hidden">{textMobile}</p>
				<div className="absolute bottom-0 w-full hidden lg:block">
					<CarouselButton />
				</div>
			</div>
		</div>
	);
};

export default CarouselWrapper;
