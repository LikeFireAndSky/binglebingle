'use client';

import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

const getAllUsers = async (userUid: string) => {
	const data = await axios.get(`/api/testuser/${userUid}`);
	if (!data) {
		throw new Error('Network response was not ok');
	}
	return data;
};

const Testpage = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			setTimeout(() => {
				alert('로그인이 필요한 서비스입니다.');
			});
		},
	});

	const { data, error, isLoading } = useQuery(['testuser'], () =>
		getAllUsers(session?.user.uid as string),
	);

	return <div>{data && data.data[0].name}</div>;
};

export default Testpage;
