'use client';

import React from 'react';

type Props = {
	watchInput: boolean;
};

const SearchResult = ({ watchInput }: Props) => {
	return (
		<div className="flex flex-col w-full h-full bg-second-color items-center">
			<h1 className='font-["TaeBaek"] text-4xl'>검색어가 입력됐어요</h1>
		</div>
	);
};
export default SearchResult;
