'use client';

import React, { MouseEventHandler } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';

const EnterButton = () => {
	const router = useRouter();
	const handleClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
		e.preventDefault();
		signIn();
	};
	return (
		<Button type="button" onClick={handleClick}>
			GET START
		</Button>
	);
};

export default EnterButton;
