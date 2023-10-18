'use client';

// react
import React, { useState } from 'react';
// react-big-calendar
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// calendar 관련 components
import MyCalendar from '@/components/Calendar/Calendar';
import MyScheduleItem from '@/components/Calendar/MyScheduleItem';

// tailwind
import { Button, Input } from '@material-tailwind/react';
import EnrollSchedule from '@/components/Calendar/EnrollSchedule';

/* 드래그 기능 추가 시 필요한 import 구문 */
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';

const MySchedule = () => {
	const addSchedule = () => {};
	const [schedule, setSchedule] = useState(['테스트1', '테스트2', '테스트3']); // 지금은 더미데이터
	return (
		<div className="container mx-auto">
			<div className="flex flex-row justify-between">
				<div className="w-1/2 mt-20">
					<MyCalendar />
				</div>
				<div className="w-1/2 mt-20 ml-10 flex flex-col justify-center border-solid border-4 border-black">
					<div className="enrollContainer w-1/2 flex flex-col justify-center mx-auto mt-4 border-solid border-4 border-black rounded-md">
						<MyScheduleItem title={'하이'} />
					</div>
					<div className="btn__container mt-20 mx-auto flex flex-row justify-center gap-1">
						<EnrollSchedule />;
						<EnrollSchedule />;
					</div>
				</div>
			</div>
		</div>
	);
};

export default MySchedule;
