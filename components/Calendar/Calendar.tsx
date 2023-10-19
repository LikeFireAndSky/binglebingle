import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { myEventsList } from '@/data/TestData';

export const localizer = momentLocalizer(moment);

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
