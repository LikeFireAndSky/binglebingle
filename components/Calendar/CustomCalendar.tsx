import { goNextDate, goPrevDate } from '@/hooks/useGetDate';
import React, { useState } from 'react';

const CustomCalendar = () => {
	const newDate = new Date();
	const year = newDate.getFullYear();
	const month = newDate.getMonth() + 1;
	const firstDayOfMonth = new Date(year, month, 1);
	const lastDayOfMonth = new Date(year, month + 1, 0);
	const date = newDate.getDate();
	const day = newDate.getDay();

	const firstDayOfWeek = firstDayOfMonth.getDay();
	const lastDateOfMonth = lastDayOfMonth.getDate();

	const daysNumber = Array.from({ length: lastDateOfMonth }, (_, i) => i + 1);

	const days = ['일', '월', '화', '수', '목', '금', '토'];

	const [thisYear, setThisYear] = useState(year);
	const [thisMonth, setThisDay] = useState(month);

	const goNextMonth = () => {
		const { year, month } = goNextDate(thisYear, thisMonth);
		setThisYear(year);
		setThisDay(month);
	};
	const goPrevMonth = () => {
		const { year, month } = goPrevDate(thisYear, thisMonth);
		setThisYear(year);
		setThisDay(month);
	};

	return (
		<div className="container my-5 flex flex-col justify-center border rounded-lg text-center">
			<div className="calendar__header mx-auto">
				<span>Calendar</span>
				<button className="prev__btn mx-3" onClick={goPrevMonth}>
					&lt;
				</button>
				<span>
					{thisYear} {thisMonth}
				</span>
				<button className="next__btn mx-3" onClick={goNextMonth}>
					&gt;
				</button>
			</div>
			<div className="calendar__container w-full grid grid-cols-7 gap-4 border-4">
				{days.map((today: string, index: number) => (
					<div key={index} className="day__cell">
						<div className="day__header mt-3 font-primary-font text-primary-color">
							{today}
						</div>
					</div>
				))}
				{daysNumber.map((dayNumber: number, dayIndex: number) => (
					<div key={dayIndex} className="day__cell border-t">
						<div className="day__count text-lg">{dayNumber}</div>
						<div className="schedule__container text-sm">일정 드롭 공간</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomCalendar;
