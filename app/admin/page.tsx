'use client';

import React, {
	Fragment,
	MouseEventHandler,
	Suspense,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
	Card,
	CardBody,
	Chip,
	Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import data from '../choose/place/place.mockup';

const fetchPostData = async (item: any) => {
	const response = await axios.post('/api/trip/admin/post', item);
	return response.data;
};

const fetchGetEnrolledData = async () => {
	const response = await axios.get('/api/trip/admin/get');
	return response.data;
};

const AdminPage = () => {
	const [pick, setPick] = React.useState<any>([]);
	const [recommend, setRecommend] = React.useState<any>([]);
	const [picked, setPicked] = React.useState<any>([]);
	const ref = useRef<any>(null);

	const { data: queryData } = useQuery(
		['getEnrolledData'],
		fetchGetEnrolledData,
		{
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
		},
	);

	useEffect(() => {
		if (queryData) {
			setPicked(queryData.data);
		}
	}, [queryData]);

	const mutation = useMutation({
		mutationFn: fetchPostData,
		onSuccess: () => {
			alert('전송 성공');
		},
		onError: () => {
			alert('전송 실패');
		},
	});

	const handleFirstPick = useCallback((item: any) => {
		setPick(item);
	}, []);

	const handleRecommend = (item: any) => {
		setRecommend([...recommend, item]);
	};

	const checkDoubleRecommend = useCallback(
		(item: any) => {
			if (pick.id === item.id) {
				alert('이미 선택된 여행지 입니다.');
				return true;
			}

			if (recommend.find((element: any) => element.id === item.id)) {
				alert('이미 선택된 추천 여행지 입니다.');
				return true;
			}
			return false;
		},
		[pick, recommend],
	);

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

	const checkPickOrRecommendIsEmpty = useCallback(() => {
		if (pick.length === 0 || recommend.length === 0) {
			return true;
		}
		return false;
	}, [pick, recommend]);

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
		mutation.mutate(postData);
		alert('제출 완료');
		setPicked([...picked, postData]);
		handleInitPickAndRecommend(e);
	};

	const isRecommendItemsInRecommend = useCallback(
		(item: any) => {
			if (recommend.find((element: any) => element.name === item)) {
				return true;
			}
			return false;
		},
		[recommend],
	);

	const isPickItemInPick = useCallback(
		(item: any) => {
			if (pick.name === item) {
				return true;
			}
			return false;
		},
		[pick],
	);

	const isAlreadyPicked = useCallback(
		(item: any) => {
			if (picked.length === 0) {
				return false;
			}
			if (picked && picked.find((element: any) => element.name === item)) {
				return true;
			}
			return false;
		},
		[picked],
	);

	const handleDeleteRecommend = useCallback(
		(item: any) => {
			const newRecommend = recommend.filter(
				(element: any) => element.name !== item,
			);
			setRecommend(newRecommend);
		},
		[recommend],
	);

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
										<button
											type="button"
											key={index}
											onClick={() => handleDeleteRecommend(item.name)}
										>
											<Chip
												value={item.name}
												className="bg-third-color w-fit mx-auto"
											/>
											{''}
										</button>
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
				<Suspense fallback={<div>Loading...</div>}>
					<div className="w-full grid grid-cols-3 gap-3 items-center">
						{data.map((item) => {
							return (
								<Button
									key={item.id}
									onClick={() => {
										clickHandler(item);
										isRecommendItemsInRecommend(item.name);
									}}
									className={`${
										isPickItemInPick(item.name)
											? 'bg-primary-color'
											: isRecommendItemsInRecommend(item.name)
											? 'bg-third-color'
											: 'bg-gray-800'
									} ${
										isAlreadyPicked(item.name)
											? 'border-4 border-primary-color'
											: ''
									}`}
								>
									<h1>{item.name}</h1>
								</Button>
							);
						})}
					</div>
				</Suspense>
			</section>
		</>
	);
};

export default AdminPage;
