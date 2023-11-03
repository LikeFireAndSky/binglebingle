import React from 'react';
import getCurrentUrl from '@/utils/getCurrentUrl';
import WorkBench from '@/components/Choose/WorkBench/WorkBench';
import { WorkBenchPropss } from '@/components/Choose/WorkBench/WorkBench.type';
import CanvasRoot from '@/components/Choose/CanvasRole/CanvasRoot';

type Props = {
	searchParams: { [key: string]: string | string[] | undefined };
};

const fetchFirstVisit = async (itemId: string) => {
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
		<section className="mx-auto absolute inset-0 top-20 w-full flex flex-col items-center bg-[#12071f]">
			<WorkBench initialData={items} />
			<CanvasRoot />
		</section>
	);
};

export default PlacePage;
