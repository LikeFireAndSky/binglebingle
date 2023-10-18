'use client';

import React from 'react';
import { Button } from '@material-tailwind/react/components/Button';
import { useSession } from 'next-auth/react';

const Main = () => {
	const { data: session } = useSession();
	return (
		<>
			<Button>Main</Button>
		</>
	);
};

export default Main;
