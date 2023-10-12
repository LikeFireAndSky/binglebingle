import { headers } from 'next/headers';
import React from 'react';

const getCurrentUrl = () => {
	const host = headers().get('host');
	const protocol = process?.env.NODE_ENV === 'production' ? 'https' : 'http';
	const url = `${protocol}://${host}`;

	return url;
};

export default getCurrentUrl;
