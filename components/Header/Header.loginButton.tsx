'use client';

import React from 'react';
import { Button } from '@material-tailwind/react/components/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

const LoginButton = () => {
	const { data: session } = useSession();

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		if (session) {
			signOut();
		} else {
			signIn();
		}
	};

	return (
		<Button type="button" onClick={handleClick} className=" bg-primary-color">
			{session ? 'LOGOUT' : 'LOGIN'}
		</Button>
	);
};

export default LoginButton;
