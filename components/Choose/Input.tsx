'use client';

import React, { useCallback, useEffect } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	searchParma: string;
};

type Props = {
	setSearchParam: React.Dispatch<React.SetStateAction<any>>;
	setWatchInput: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputWithButton = ({ setSearchParam, setWatchInput }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		setSearchParam(data.searchParma);
	};

	useEffect(() => {
		const subscription = watch((value) => {
			if (value.searchParma) {
				setWatchInput(true);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, setWatchInput]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="relative flex w-full max-w-[37rem] justify-center"
		>
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
			<Button
				size="sm"
				type="submit"
				className="!absolute right-1 top-1 rounded hidden md:block"
			>
				검색하기
			</Button>
		</form>
	);
};

export default InputWithButton;
