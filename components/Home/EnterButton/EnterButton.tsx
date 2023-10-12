'use client';

import React, { MouseEventHandler } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@material-tailwind/react';

const EnterButton = () => {
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
