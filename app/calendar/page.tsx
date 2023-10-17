'use client';

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
/* 드래그 기능 추가 시 필요한 import 구문 */
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';

const localizer = momentLocalizer(moment);
/* 이 부분을 하나의 컴포넌트로 가지고 오면 될 듯 */
const myEventsList = [
	{
		title: '수원 여행 가자',
		start: new Date(2023, 9, 17, 12, 6, 0),
		end: new Date(2023, 9, 18, 12, 6, 0),
	},
	{
		title: '평택 여행 가자',
		start: new Date(2023, 9, 18, 12, 6, 0),
		end: new Date(2023, 9, 20, 12, 6, 0),
	},
];

const calendarStyle = {
	width: 800,
	height: 500,
	// margin: '20px auto',
};
const Calender = () => {
	return (
		<div className="relative h-32 w-32 ...">
			<div className="absolute inset-x-20 top-20 h-16 ...">
				<Calendar
					localizer={localizer}
					events={myEventsList}
					startAccessor="start"
					endAccessor="end"
					style={calendarStyle}
				/>
			</div>
		</div>
	);
};

export default Calender;
