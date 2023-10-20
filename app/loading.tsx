'use client';

import { Spinner, Typography } from '@material-tailwind/react';
import React from 'react';

const loading = () => {
	return (
		<div className="fixed w-full h-full flex flex-col items-center justify-center z-[999] inset-0 top-0 left-0">
			<Typography variant="h3" color="orange" className="mb-5">
				Loading...
			</Typography>
			<Spinner color="orange" className="h-16 w-16 text-primary-color/70" />;
		</div>
	);
};

export default loading;
