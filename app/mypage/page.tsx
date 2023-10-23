'use client';

import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

const ppap = async (userUid: string) => {
	const data = await axios.get(`/api/user/get?userUid=${userUid}`);
	if (!data) {
		throw new Error('Network response was not ok');
	}
	return data;
};

const MyPage = () => {
	const router = useRouter();
	const routeToMain = () => {
		router.push('/main');
	};

	const { data: session } = useSession({
		required: true,
		onUnauthenticated: () => routeToMain(),
	});

	const queryOptions = {
		staleTime: 1000 * 60 * 5, // 5분
		cacheTime: 1000 * 60 * 5, // 5분
	};

	// generateStaticParams

	const { data: userData, isLoading } = useQuery(
		[session?.user.uid],
		() => ppap(session?.user.uid as string),
		queryOptions,
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

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
					<CardBody className="grid grid-flow-col items-center justify-around">
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
								{session?.user.uid}
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
			{userData && <h1>{userData.data.name}의 정보입니다</h1>}
			<ul className="text-center">
				<li>이름 : {userData?.data.name}</li>
				<li>이메일 : {userData?.data.email}</li>
			</ul>
		</section>
	);
};

export default MyPage;
