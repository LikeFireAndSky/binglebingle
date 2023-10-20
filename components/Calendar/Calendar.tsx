import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { myEventsList } from '@/data/TestData';
import { Droppable } from '@hello-pangea/dnd';

export const localizer = momentLocalizer(moment);

export const calendarStyle = {
	width: 800,
	height: 500,
};
const MyCalendar = () => {
	return (
		<Droppable droppableId="myCalendar">
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					style={calendarStyle}
				>
					<Calendar
						localizer={localizer}
						events={myEventsList}
						startAccessor="start"
						endAccessor="end"
					/>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default MyCalendar;
