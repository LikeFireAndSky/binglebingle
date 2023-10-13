'use client';

import React from 'react';
import { FaBeer } from 'react-icons/fa';

export default function Navbar() {
	const [navbarOpen, setNavbarOpen] = React.useState(false);

	// URL명이 /home이면, navbar를 숨김
	if (window.location.pathname === '/home') {
		return <></>;
	}

	return (
		<>
			<nav className="relative flex flex-wrap items-center justify-between px-2 py-3 box-border navbar-expand-lg bg-amber-500 mb-3">
				<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						<a
							className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
							href="#pablo"
						>
							amber Notus
						</a>
						<button
							className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
							type="button"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<i>
								{``}
								<FaBeer />
							</i>
						</button>
					</div>
					<div
						className={`animate-in fade-in lg:flex flex-grow items-center  duration-1000 transition-opacity ease-out ${
							navbarOpen ? 'flex' : 'hidden'
						}`}
						id="example-navbar-danger"
					>
						<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
							<li className="nav-item">
								<a
									className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
									href="#pablo"
								>
									<i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
									<span className="ml-2">Share</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
									href="#pablo"
								>
									<i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
									<span className="ml-2">Tweet</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
									href="#pablo"
								>
									<i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
									<span className="ml-2">Pin</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
