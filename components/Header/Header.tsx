'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
	Navbar,
	Collapse,
	Typography,
	IconButton,
} from '@material-tailwind/react';
import { usePathname, useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LoginButton from './Header.loginButton';

function NavList() {
	const router = useRouter();
	// URL명이 /home이면, navbar를 숨김
	return (
		<div className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-medium"
			>
				<Link
					href="/main"
					className="flex items-center hover:text-blue-500 transition-colors"
				>
					MAIN
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-medium"
			>
				<Link
					href="/page"
					className="flex items-center hover:text-blue-500 transition-colors"
				>
					PAGE
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-medium"
			>
				<Link
					href="/myschedule"
					className="flex items-center hover:text-blue-500 transition-colors"
				>
					CALENDAR
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-medium"
			>
				<Link
					href="/mypage"
					className="flex items-center hover:text-blue-500 transition-colors"
				>
					MYPAGE
				</Link>
			</Typography>
			<LoginButton />
		</div>
	);
}

export default function NavbarSimple() {
	const [openNav, setOpenNav] = React.useState(false);

	const handleWindowResize = () =>
		window.innerWidth >= 960 && setOpenNav(false);

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	const currentUrl = usePathname();
	if (currentUrl === '/home') {
		return null;
	}

	return (
		<Navbar className="w-full px-6 py-3 fixed mx-auto inset-x-0 z-[5]">
			<div className="flex items-center justify-between text-blue-gray-900">
				<Link href="/home">
					<Typography
						variant="h6"
						className="mr-4 cursor-pointer py-1.5 font-['Taebaek']"
					>
						여행은제이지
					</Typography>
				</Link>
				<div className="hidden lg:block">
					<NavList />
				</div>
				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<XMarkIcon className="h-6 w-6" strokeWidth={2} />
					) : (
						<Bars3Icon className="h-6 w-6" strokeWidth={2} />
					)}
				</IconButton>
			</div>
			<Collapse open={openNav}>
				<NavList />
			</Collapse>
		</Navbar>
	);
}
