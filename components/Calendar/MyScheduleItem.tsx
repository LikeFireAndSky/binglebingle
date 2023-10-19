import { Button } from '@material-tailwind/react';
import React from 'react';

interface Title {
	title: string | number;
}
const MyScheduleItem = ({ title }: Title) => {
	return (
		<Button
			variant="gradient"
			className="w-1/2 mx-auto mt-5 hover:bg-primary-color"
		>
			{title}
		</Button>
	);
};

export default MyScheduleItem;
