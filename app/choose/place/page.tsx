import React from 'react';
import getCurrentUrl from '@/utils/getCurrentUrl';
import WorkBench from '@/components/Choose/WorkBench/WorkBench';
import { WorkBenchPropss } from '@/components/Choose/WorkBench/WorkBench.type';

type Props = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export const fetchFirstVisit = async (itemId: string) => {
	const url = getCurrentUrl();
	const res = await fetch(`${url}/api/trip/place/${itemId}`);
	const data = await res.json();
	return data;
};

const PlacePage = async ({ searchParams }: Props) => {
	const { firstVisit } = searchParams;
	const initialData = await fetchFirstVisit(firstVisit as string);
	const items = initialData.data.recommend_location;

	return (
		<section className="mx-auto absolute inset-0 top-20 w-4/5 flex flex-col items-center">
			<h1>품번 : {initialData && initialData.data.name}</h1>
			<WorkBench initialData={items} />
		</section>
	);
};

export default PlacePage;
