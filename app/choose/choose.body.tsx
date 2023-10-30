'use client';

import InputWithButton from '@/components/Choose/Input';
import React, { useEffect } from 'react';
import { Card, CardBody, Chip } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const fetchAllDatas = async () => {
	const data = await axios.get('/api/trip/get');
	return data.data;
};

type Props = {
	initialData: any;
};

const ChooseBody = ({ initialData }: Props) => {
	const [searchParam, setSearchParam] = React.useState<any>();
	const [keyword, setKeyword] = React.useState<string>('');
	const [trips, setTrips] = React.useState<any>();

	const { data, isLoading, isError } = useQuery(['trips'], fetchAllDatas, {
		staleTime: 1000 * 60 * 3,
		cacheTime: 1000 * 60 * 5,
		initialData,
		enabled: false,
	});

	useEffect(() => {
		if (data) {
			setTrips(data.data);
		}
	}, [data]);

	if (isLoading) return <div>Loading...</div>;

	const filteredTripName = (tripName: string) => {
		if (keyword === '') {
			return false;
		}
		if (tripName.includes(keyword)) {
			return true;
		}
		return false;
	};

	return (
		<div id="body" className="w-full h-full">
			<Card className="border-2 border-primary-color">
				<CardBody className="">
					<InputWithButton
						setSearchParam={setSearchParam}
						setKeyword={setKeyword}
					/>
					<p>입력된 검색어 : {keyword}</p>
				</CardBody>
				<div className="w-full justify-center p-3 gap-2 text-black flex flex-row flex-wrap">
					{trips &&
						trips.map((trip: any) => (
							<Link
								href={`/choose/place?firstVisit=${trip.id}&tripName=${trip.name}`}
								passHref={true}
								key={trip.id}
								className="w-fit"
							>
								<Chip
									value={trip.name}
									className={`${
										filteredTripName(trip.name)
											? 'bg-primary-color'
											: 'bg-gray-300'
									} text-black`}
								/>
							</Link>
						))}
				</div>
			</Card>
		</div>
	);
};

export default ChooseBody;
