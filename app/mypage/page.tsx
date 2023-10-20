'use client';

import React, { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MyPage = () => {
	const router = useRouter();
	const routeToMain = () => {
		router.push('/main');
	};

	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			routeToMain();
			setTimeout(() => {
				alert('로그인이 필요한 서비스입니다.');
			});
		},
	});
	const ref = useRef(null);

	return (
		<section className="mx-auto absolute inset-0 top-20 w-2/3 lg:w-3/5 flex flex-col  items-center">
			<div id="header" className="flex flex-col w-full  mt-3 ">
				<h1 className='font-["TaeBaek"] text-4xl mb-3'>마이 페이지</h1>
				<div className="flex flex-col mb-5 border-b-2 pb-3">
					<p>당신의 여행에 행복이 함께하길 제이지가 언제나 바랍니다 😎 </p>
				</div>
			</div>
			<div id="body" className="w-full mt-3 flex flex-col">
				<Card>
					<CardBody
						ref={ref}
						className="grid grid-flow-col items-center justify-around"
					>
						<Image
							src={session?.user.image as string}
							alt="user Image"
							width={100}
							height={100}
							className="rounded-full"
						/>
						<div className="flex flex-col items-start">
							<Typography variant="h3" className="text-center">
								{session?.user.name}님 환영합니다!
							</Typography>
							<div className="flex flex-row gap-2">
								<Chip value="이메일" />
								{session?.user.email}
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</section>
	);
};

export default MyPage;
