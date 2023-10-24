import React from 'react';
import Link from 'next/link';
import WorkBench from '@/components/Choose/WorkBench/WorkBench';

type Props = {
	searchParams: { [key: string]: string | string[] | undefined };
};

const PlacePage = ({ searchParams }: Props) => {
	const { firstVisit } = searchParams;
	return (
		<section className="mx-auto absolute inset-0 top-20 w-4/5 flex flex-col items-center">
			<h1>{firstVisit}</h1>
			<Link
				href={`?${new URLSearchParams({
					firstVisit: '동해물',
				})}`}
			>
				<button>동해물로 변경</button>
			</Link>
			<WorkBench />
		</section>
	);
};

export default PlacePage;
