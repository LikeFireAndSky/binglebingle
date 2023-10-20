'use client';

import React, { MouseEventHandler } from 'react';
import { Button } from '@material-tailwind/react/components/Button';
import { useRouter } from 'next/navigation';

const EnterButton = () => {
	const router = useRouter();

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
		e.preventDefault();
		router.push('/main');
	};

	return (
		<Button type="button" onClick={handleClick}>
			GET START
		</Button>
	);
};

export default EnterButton;
