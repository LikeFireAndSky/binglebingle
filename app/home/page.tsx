import React from 'react';
import getCurrentUrl from '@/utils/getCurrentUrl';
import HomeAnimation from '@/components/Lottie/Lottie';
import EnterButton from '@/components/Home/EnterButton/EnterButton';

// const fetchHello = async (data: object) => {
// 	const currentUrl = getCurrentUrl();
// 	const res = await fetch(`${currentUrl}/api/cart`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(data),
// 	});
// 	if (!res.ok) {
// 		throw new Error(res.statusText);
// 	}
//
// 	return res.json();
// };

// const fetchKV = async (name: string) => {
// 	const currentUrl = getCurrentUrl();
// 	const res = await fetch(`${currentUrl}/api/cart?param1=${name}`, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	});

// 	if (!res.ok) {
// 		throw new Error(res.statusText);
// 	}

// 	return res.json();
// };

// const fetchPost = async () => {
// 	const currentUrl = getCurrentUrl();
// 	const res = await fetch(`${currentUrl}/api/get`, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	});

// 	if (!res.ok) {
// 		throw new Error(res.statusText);
// 	}

// 	return res.json();
// };

const Home = async () => {
	// const data = await fetchKV('John Doe');
	// const data2 = await fetchPost();

	return (
		<section className="w-full h-screen bg-yellow-900 flex flex-col justify-center items-center">
			<div className="rounded-md bg-white w-2/3 md:w-1/3 flex flex-col items-center py-10 group">
				<h1 className="text-3xl font-['Taebaek'] text-center flex flex-col sm:flex-row sm:gap-2">
					여행은<p>J-EASY</p>
				</h1>
				<HomeAnimation />
				<div className="flex flex-col items-center mb-3">
					<p className="text-sm">
						MADE BY <strong>`REALBELL & HANAPO`</strong>
					</p>
					<ul className="text-xs text-center mt-1 flex flex-col sm:flex-row">
						<li>P들한테 시달렸나요? 우리 J들은</li>
						<li>모든 여행 일정이 딱 맞아 떨어져야해요</li>
					</ul>
				</div>
				<EnterButton />
			</div>
		</section>
	);
};

export default Home;
