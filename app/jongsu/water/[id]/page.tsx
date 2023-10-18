'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const Page = () => {
	const pathName = usePathname();
	return <div>page</div>;
};

export default Page;
