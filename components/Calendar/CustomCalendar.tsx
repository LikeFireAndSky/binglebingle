import React from 'react';

const CustomCalendar = () => {
	const days = {
		0: '월',
		1: '화',
		2: '수',
		3: '목',
		4: '금',
		5: '토',
		6: '일',
	};
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const dayOftheWeek = today.getDay();
	const dayNumber = today.getDate();

	return (
		<div className="container my-5 flex flex-col justify-center border rounded-lg">
			<div className="calendar__header mx-auto">
				Calendar &lt; October 2017 &gt;
			</div>
			<div className="calendar__container grid grid-cols-7 gap-4 border-4">
				{Object.values(days).map((day: string) => (
					<div key={day} className="day__cell">
						<div className="day__header">{day}</div>
					</div>
				))}
				<div className="day__cell border">
					<div className="day__count">1</div>
					<div className="schedule__container">일정 적는 곳</div>
				</div>

				<div className="day__cell border">
					<div className="day__count">2</div>
					<div className="schedule__container">일정 적는 곳</div>
				</div>

				<div className="day__cell border">
					<div className="day__count">3</div>
					<div className="schedule__container">일정 적는 곳</div>
				</div>

				<div className="day__cell border">
					<div className="day__count">4</div>
					<div className="schedule__container">일정 적는 곳</div>
				</div>

				<div className="day__cell border">
					<div className="day__count">5</div>
					<div className="schedule__container">일정 적는 곳</div>
				</div>

				<div className="day__cell border">
					<div className="day__count">6</div>
					<div className="schedule__container">일정 적는 곳</div>
				</div>

				<div className="day__cell border">
					<div className="day__count">7</div>
					<div className="schedule__container">일정 적는 곳</div>
				</div>
			</div>
		</div>
	);
};

export default CustomCalendar;
