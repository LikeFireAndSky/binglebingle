import { Button } from '@material-tailwind/react';
import React from 'react';
// import { Draggable } from 'react-beautiful-dnd';
import { Draggable } from '@hello-pangea/dnd';

interface Title {
	title: string;
	index: number;
}
const MyScheduleItem = ({ title, index }: Title) => {
	if (index === undefined) {
		return null;
	}
	return (
		<Draggable draggableId={title} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Button
						variant="gradient"
						className="w-1/2 mx-auto mt-5 hover:bg-primary-color"
					>
						{title}
					</Button>
				</div>
			)}
		</Draggable>
	);
};

export default MyScheduleItem;
