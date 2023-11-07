import { Button, Chip } from '@material-tailwind/react';
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
	return (
		<Draggable draggableId={trip.trip_id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Chip
						className={`w-full max-w-[12rem] mx-auto mt-5 shadow hover:scale-110 ${
							trip.trip_schedule === 1
								? 'bg-yellow-500'
								: trip.trip_schedule === 2
								? 'bg-blue-500'
								: 'bg-primary-color'
						}`}
						value={title}
					/>
				</div>
			)}
		</Draggable>
	);
};

export default React.memo(MyScheduleItem);
