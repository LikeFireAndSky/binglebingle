import React from 'react';
import CarouselTransition from '@/components/Carousel/Carousel';
import MockData from './main.mockup';

const page = () => {
	return (
		<section className="mx-auto pt-20 w-4/5 h-screen flex flex-col justify-center items-center">
			<div id="header" className="flex flex-col items-center">
				<h1 className='font-["TaeBaek"] text-4xl mb-3'>여행은 제이지</h1>
				<div className="flex flex-col items-center mb-5">
					<p>대한민국에는 참 예쁜 곳이 많죠?</p>
					<p>아름다운 대한민국의 여행지를 간단한 여행일정과 함께 즐기세요</p>
					<p>당신의 여행에 행복이 함께하길 제이지가 언제나 바랍니다 😎 </p>
				</div>
			</div>
			<div className="w-full bg-second-color grid grid-flow-col gap-4">
				<CarouselTransition />
				<div>
					<div>determine</div>
					<div className="w-full bg-red-500 col-span-2">안녕 반가워</div>
				</div>
			</div>
		</section>
	);
};

export default page;
