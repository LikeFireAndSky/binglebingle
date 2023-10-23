import React from 'react';
import absoluteUrl from 'next-absolute-url';

const getCurrentUrl = () => {
	const { origin } = absoluteUrl();
	return origin;
};

export default getCurrentUrl;
