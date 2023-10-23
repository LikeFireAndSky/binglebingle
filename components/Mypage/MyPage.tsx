'use client';

import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const MyPage = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			setTimeout(() => {
				alert('로그인이 필요한 서비스입니다.');
			});
		},
	});

	return (
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
	);
};

export default MyPage;
