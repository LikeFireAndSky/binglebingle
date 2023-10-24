import { goNextDate, goPrevDate } from '@/hooks/useGetDate';
import React, { useEffect, useState } from 'react';

import { Droppable } from '@hello-pangea/dnd';

const CustomCalendar = () => {
	const newDate = new Date();
	// const year = newDate.getFullYear();
	const [year, setYear] = useState(newDate.getFullYear());
	const [month, setMonth] = useState(newDate.getMonth() + 1);
	const [daysNumber, setDaysNumber] = useState<number[]>([]); // 1일부터~
	const firstDayOfMonth = new Date(year, month - 1, 1); // 매달 1일의 정보
	const lastDayOfMonth = new Date(year, month, 0); // 매달 마지막 날의 정보
	const firstDay = firstDayOfMonth.getDay(); // 매달 1일의 요일
	const lastDateOfMonth = lastDayOfMonth.getDate(); // 매달 마지막날의 날짜
	const prevMonthOfLastDate = new Date(year, month - 1, 0).getDate();

	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const goNextMonth = () => {
		const { year: nextYear, month: nextMonth } = goNextDate(year, month);
		setYear(nextYear);
		setMonth(nextMonth);
	};
	const goPrevMonth = () => {
		const { year: prevYear, month: prevMonth } = goPrevDate(year, month);
		setYear(prevYear);
		setMonth(prevMonth);
	};

	useEffect(() => {
		const newDaysNumber = Array.from(
			{ length: lastDateOfMonth },
			(_, i) => i + 1,
		);
		setDaysNumber(newDaysNumber);
	}, [year, month, lastDateOfMonth]);

	return (
		<div className="container my-5 flex flex-col justify-center border rounded-lg text-center">
			<div className="calendar__header mx-auto">
				<span>Calendar</span>
				<button className="prev__btn mx-3" onClick={goPrevMonth}>
					&lt;
				</button>
				<span>
					{year} {month}
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
				{Array.from({ length: firstDay }, (_, i) => (
					<div key={i} className="day__cell">
						<div className="day__header mt-5 text-blue-gray-300">
							{prevMonthOfLastDate - firstDay + i + 1}{' '}
						</div>
					</div>
				))}
				{daysNumber.map((dayNumber: number, dayIndex: number) => (
					<div key={dayIndex} className="day__cell border-t">
						<div className="day__count text-lg">{dayNumber}</div>
						{/* <div className="schedule__container text-sm">일정 드롭 공간</div> */}
						<Droppable droppableId={`droppable-${dayIndex}`}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="schedule__container text-sm"
								>
									일정 드롭 공간
								</div>
							)}
						</Droppable>
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomCalendar;
