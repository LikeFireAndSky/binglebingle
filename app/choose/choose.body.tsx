'use client';

import InputWithButton from '@/components/Choose/Input';
import { useSpring, animated, useSpringRef } from '@react-spring/web';
import SearchResult from '@/components/Choose/SearchResult';

import React from 'react';
import { Card, CardBody } from '@material-tailwind/react';

const ChooseBody = () => {
	const [searchParam, setSearchParam] = React.useState<any>();
	const [watchInput, setWatchInput] = React.useState<boolean>(false);

	const api = useSpringRef();
	const props = useSpring({
		ref: api,
		from: { opacity: 0 },
		delay: 1500,
	});

	if (watchInput) {
		api.start({
			to: { opacity: 1 },
		});
	}
	return (
		<div id="body" className="w-full h-full">
			<Card className="border-2 border-primary-color">
				<CardBody className="">
					<InputWithButton
						setSearchParam={setSearchParam}
						setWatchInput={setWatchInput}
					/>
					<p>입력된 검색어 : {searchParam}</p>
					<div className=" h-64">
						{watchInput && (
							<animated.div style={props} className="h-full">
								<SearchResult watchInput={watchInput} />
							</animated.div>
						)}
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default ChooseBody;
