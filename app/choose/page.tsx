import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ChooseBody from './choose.body';
import data from './choose.mockData';

const Page = () => {
	return (
		<section className="mx-auto absolute inset-0 top-20 w-4/5 flex flex-col  items-center">
			<div className="w-full relative h-full">
				<div id="header" className="flex flex-col w-full items-center mt-3 ">
					<h1 className='font-["TaeBaek"] text-lg md:text-4xl mb-3'>
						일정을 등록하세요
					</h1>
				</div>
				<div id="body" className="w-full">
					<ChooseBody />
				</div>
				<div id="body_under" className="flex flex-col w-full mt-3 ">
					<h2 className="my-5 text-orange-600 font-['TaeBaek'] text-lg md:text-3xl text-center">
						에디터가 추천하는 여행지
					</h2>
					<ul
						id="container"
						className="grid grid-flow-row md:grid-flow-col gap-12 font-['Taebaek']"
					>
						{data.map((item: any, index: number) => {
							return (
								<li key={index} className="flex justify-center w-full">
									<Link
										href={`/choose/place?firstVisit=${item.name}`}
										passHref={true}
									>
										<div className="w-full flex flex-col items-center gap-1  bg-primary-color rounded-lg">
											<Image
												priority
												src={item.image}
												alt="5"
												className="object-cover h-56 rounded-t-lg"
											/>
											<p>{item.name}</p>
										</div>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Page;
