'use client';

import React, { MouseEventHandler } from 'react';
import { signIn } from 'next-auth/react';

const EnterButton = () => {
	const handleClick: MouseEventHandler<HTMLButtonElement> = (e): void => {};
	return (
		<button type="button" onClick={handleClick}>
			GET START
		</button>
	);
};

export default EnterButton;
