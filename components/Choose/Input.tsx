'use client';

import React, { useCallback, useEffect } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import _ from 'lodash';

type Inputs = {
	searchParma: string;
};

type Props = {
	setSearchParam: React.Dispatch<React.SetStateAction<any>>;
	setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

const InputWithButton = React.memo(({ setSearchParam, setKeyword }: Props) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const cleanString = (str: string) => {
		const cleanStr = _.replace(str, /[^a-zA-Z0-9\uAC00-\uD7A3]/g, '');
		return cleanStr;
	};

	const watchAllFields = watch('searchParma');
	useEffect(() => {
		// debounce 함수가 반환하는 함수를 debounceCallback에 저장합니다.
		const debounceCallback = _.debounce(() => {
			setKeyword(cleanString(watchAllFields));
		}, 1000);

		// debounceCallback을 실행합니다.
		debounceCallback();

		// 컴포넌트가 unmount될 때 debounce를 취소합니다.
		return () => debounceCallback.cancel();
	}, [setKeyword, watchAllFields]);

	return (
		<div className="relative flex w-full justify-center">
			<Input
				type="search"
				label="검색어를 입력하세요"
				crossOrigin="anonymous"
				className="w-full text-[10px] md:text-base"
				containerProps={{
					className: 'min-w-0',
				}}
				{...register('searchParma', { required: true })}
			/>
		</div>
	);
});

export default InputWithButton;
