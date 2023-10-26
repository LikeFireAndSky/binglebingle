'use client';

import React, { MouseEventHandler } from 'react';
import {
	Button,
	Card,
	CardBody,
	Chip,
	Typography,
} from '@material-tailwind/react';
import data from '../choose/place/place.mockup';

const AdminPage = () => {
	const [pick, setPick] = React.useState<any>([]);
	const [recommend, setRecommend] = React.useState<any>([]);

	const handleFirstPick = (item: any) => {
		setPick(item);
	};

	const handleRecommend = (item: any) => {
		setRecommend([...recommend, item]);
	};

	const checkDoubleRecommend = (item: any) => {
		if (pick.id === item.id) {
			alert('이미 선택된 여행지 입니다.');
			return true;
		}

		if (recommend.find((element: any) => element.id === item.id)) {
			alert('이미 선택된 추천 여행지 입니다.');
			return true;
		}
		return false;
	};

	const clickHandler = (item: any) => {
		if (pick.length === 0) {
			handleFirstPick(item);
			return;
		}
		if (checkDoubleRecommend(item)) {
			return;
		}

		handleRecommend(item);
	};

	const checkPickOrRecommendIsEmpty = () => {
		if (pick.length === 0 || recommend.length === 0) {
			return true;
		}
		return false;
	};

	const handleInitPickAndRecommend: MouseEventHandler<HTMLElement> = (e) => {
		e.preventDefault();
		setPick([]);
		setRecommend([]);

		// eslint-disable-next-line no-console
		console.log('초기화 완료');
		alert('초기화 완료');
	};

	const handleMakePost: MouseEventHandler<HTMLElement> = (e) => {
		e.preventDefault();

		if (checkPickOrRecommendIsEmpty()) {
			alert('데이터가 없습니다.');
			return;
		}

		const postData = {
			name: pick.name,
			id: pick.id,
			recommend_location: [...recommend],
		};

		// eslint-disable-next-line no-console
		console.log(postData);
		alert('제출 완료');
		handleInitPickAndRecommend(e);
	};

	return (
		<>
			<section className="mx-auto absolute inset-0 top-20 w-4/5">
				<Card className="w-full justify-center items-center bg-primary-color mb-5">
					<CardBody className="flex flex-col gap-3">
						<div className="text-second-color font-['TaeBaek'] whitespace-nowrap">
							선택된 여행지 : <strong>{pick.name}</strong>
						</div>
						<div>
							<Typography color="white" className='font-["TaeBaek"] mb-3'>
								추천 여행지 리스트
							</Typography>
							<div className="grid grid-cols-3 gap-2 py-5 px-5 rounded-md bg-second-color">
								{recommend.map((item: any, index: number) => {
									return (
										<Chip
											key={index}
											value={item.name}
											className="bg-third-color w-fit mx-auto"
										/>
									);
								})}
							</div>
						</div>
						<div className="button-group flex flex-row gap-3 justify-start">
							<Button onClick={handleMakePost}>제출하기</Button>
							<Button onClick={handleInitPickAndRecommend}>초기화 하기</Button>
						</div>
					</CardBody>
				</Card>
				<div className="w-full grid grid-cols-3 gap-3 items-center">
					{data.map((item) => {
						return (
							<Button
								key={item.id}
								onClick={() => {
									clickHandler(item);
								}}
							>
								<h1>{item.name}</h1>
							</Button>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default AdminPage;
