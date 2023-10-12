'use client';

import React, { MouseEventHandler } from 'react';

const Page = () => {
	return (
		<div className="w-4/5 h-screen flex flex-col mx-auto my-auto items-center justify-center">
			<div className="text-5xl flex flex-col justify-center items-center">
				<h1>
					<strong>돌려돌려 돌림판</strong> 시작해볼까요?
				</h1>
				<div className="w-4/5 h-96 bg-primary-color"></div>
				<button type="button">로그아웃</button>
			</div>
		</div>
	);
};

export default Page;
