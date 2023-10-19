import React from 'react';
import CarouselWrapper from '@/components/Carousel/Carousel.wrapper';
import MockData from './main.mockup';

const page = () => {
	return (
		<section className="mx-auto absolute inset-0 top-20 w-4/5 h-screen flex flex-col  items-center">
			<div id="header" className="flex flex-col w-full items-center mt-3 ">
				<h1 className='font-["TaeBaek"] text-4xl mb-3'>여행은 제이지</h1>
				<div className="flex flex-col items-center mb-5 border-b-2 pb-3">
					<p className="hidden sm:inline">대한민국에는 참 예쁜 곳이 많죠?</p>
					<p className="hidden sm:inline">
						아름다운 대한민국의 여행지를 간단한 여행일정과 함께 즐기세요
					</p>
					<p>당신의 여행에 행복이 함께하길 제이지가 언제나 바랍니다 😎 </p>
				</div>
				<CarouselWrapper data={MockData} />
				<div id="bottom">안녕</div>
			</div>
		</section>
	);
};

export default page;
