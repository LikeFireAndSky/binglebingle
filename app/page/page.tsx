'use client';

import Image from 'next/image';
import React, { MouseEventHandler } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

const Page = () => {
	return (
		<Card className="w-4/5 h-screen flex flex-col mx-auto my-auto items-center justify-center">
			<div className="text-5xl flex flex-col w-3/5 justify-center items-center">
				<h1>
					<strong>여러분</strong> 환영합니다
				</h1>
				<Image
					src="https://dvfx9cgvtgnyd.cloudfront.net/hotshot/image-gen/gif_a3c89d61-6101-44bb-b973-55eb20b83a91.gif"
					alt="adsf"
					className="w-full h-full rounded-lg"
					width={100}
					height={100}
				/>
			</div>
			<CardBody className="w-3/5 bg-primary-color">
				<Typography variant="h4" color="white" className="">
					당신의 여행을 책임 질 여행은제이지 입니다
				</Typography>
				<Typography variant="paragraph" className="text-white">
					여행은제이지는 여러분의 여행을 책임 질 것입니다. 간단하게 여행을
					계획하고, 여행을 즐기세요. 더 이상 일정을 짜면서 고민 받지 마세요
					당신은 이제 계획한대로 여행을 즐기면 됩니다.
				</Typography>
			</CardBody>
		</Card>
	);
};

export default Page;
