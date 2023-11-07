import { goNextDate, goPrevDate } from '@/hooks/useGetDate';
import React, { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Trip } from '@/interfaces/myschedule';
import MyScheduleItem from './MyScheduleItem';

const CustomCalendar = ({ updatedList }: { updatedList: Trip[] }) => {
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
	const startOfMonth = new Date(year, month - 1, 1);
	const endOfMonth = new Date(year, month, 0);

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
		<div className="container my-5 flex flex-col justify-center border-2 shadow rounded-lg text-center px-3 py-2">
			<div className="calendar__header mx-auto flex gap-2 items-center">
				<span>My Calendar</span>
				<button className="prev__btn text-sm" onClick={goPrevMonth}>
					<BsChevronLeft />
				</button>
				<span className="currentDate font-bold text-sm">
					{year} {month}
				</span>
				<button className="next__btn text-sm" onClick={goNextMonth}>
					<BsChevronRight />
				</button>
			</div>
			<div className="calendar__container w-full grid grid-cols-7 gap-4">
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
				{daysNumber.map((dayNumber: number) => (
					<div
						key={dayNumber}
						className="day__cell border-t border-bg-grey-200 w-full min-h-[4rem] hover:border-2 scale-110 hover:border-green-100 rounded-md"
					>
						<div className="day__count text-lg">{dayNumber}</div>
						<Droppable
							droppableId={`droppable-${year}-${month}-${dayNumber + 1}`}
						>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="schedule__container text-sm w-full"
								>
									{updatedList
										.filter((trip) => {
											// 계산된 이벤트의 시작일과 종료일 범위를 구함
											const eventStart = new Date(
												trip.currentYear,
												trip.currentMonth - 1,
												trip.currentDay,
											);
											const eventEnd = new Date(
												trip.currentYear,
												trip.currentMonth - 1,
												trip.endDay,
											);

											// 현재 날짜와 비교하여 해당 달에 표시
											return (
												eventStart <=
													new Date(year, month - 1, dayNumber + 1) &&
												eventEnd >= new Date(year, month - 1, dayNumber + 1)
											);
										})
										.map((trip, index) => (
											<MyScheduleItem
												key={trip.trip_id}
												index={index}
												title={trip.trip_name}
												trip={trip}
											/>
										))}
									{provided.placeholder}
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
