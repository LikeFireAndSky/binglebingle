'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';
import { signIn, signOut } from 'next-auth/react';

const NOTLOGIN = () => {
	const router = useRouter();

	return (
		<div>
			NOT LOGIN
			<Button onClick={() => signIn()}>로그인</Button>
			<Button onClick={() => signOut()}>로그아웃</Button>
			<Button onClick={() => router.push('/')}>홈으로</Button>
		</div>
	);
};

export default NOTLOGIN;
