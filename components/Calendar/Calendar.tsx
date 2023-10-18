import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

export const localizer = momentLocalizer(moment);

export const myEventsList = [
	{
		title: '수원 여행 가자',
		start: new Date(2023, 9, 16, 12, 6, 0),
		end: new Date(2023, 9, 18, 12, 6, 0),
	},
	{
		title: '평택 여행 가자',
		start: new Date(2023, 9, 18, 12, 6, 0),
		end: new Date(2023, 9, 20, 12, 6, 0),
	},
];

export const calendarStyle = {
	width: 800,
	height: 500,
	// margin: '20px auto',
};
const MyCalendar = () => {
	return (
		<Calendar
			localizer={localizer}
			events={myEventsList}
			startAccessor="start"
			endAccessor="end"
			style={calendarStyle}
		/>
	);
};

export default MyCalendar;
