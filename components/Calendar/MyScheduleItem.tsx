import { Button } from '@material-tailwind/react';
import React from 'react';
// import { Draggable } from 'react-beautiful-dnd';
import { Draggable } from '@hello-pangea/dnd';
import { Trip } from '@/interfaces/myschedule';

interface IMyScheduleItem {
	title: string;
	index: number;
	trip: Trip;
}

const MyScheduleItem = ({ title, index, trip }: IMyScheduleItem) => {
	// if (index === undefined) {
	// 	return null;
	// }
	return (
		<Draggable draggableId={trip.trip_id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Button
						variant="gradient"
						className="w-100 h-100 mx-auto mt-5 hover:bg-primary-color"
					>
						{title}
					</Button>
				</div>
			)}
		</Draggable>
	);
};

export default React.memo(MyScheduleItem);
