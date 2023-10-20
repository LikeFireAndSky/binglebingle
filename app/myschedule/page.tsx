'use client';

// react
import React, { useState } from 'react';
// react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// calendar 관련 components
import MyCalendar from '@/components/Calendar/Calendar';
import MyScheduleItem from '@/components/Calendar/MyScheduleItem';

// custom components
import EnrollSchedule from '@/components/Calendar/EnrollSchedule';
import { myItemTitle } from '@/data/TestData';

/* 드래그 기능 추가 시 필요한 import 구문 */
// import { DragDropContext } from 'react-beautiful-dnd';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';

const MySchedule = () => {
	// 임시 함수 => react.memo 로 감싸놔야함.
	const onDragEnd = (arg: any) => {
		console.log(arg);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="myCalendar">
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className="container mx-auto">
							<div className="flex flex-row justify-between">
								<div className="w-1/2 mt-20">
									<MyCalendar />
									{provided.placeholder}
								</div>
								<div className="w-1/2 mt-20 ml-10 flex flex-col justify-center">
									<div className="enrollContainer w-1/2 flex flex-col justify-center mx-auto mt-4 border-solid border-4 border-black rounded-md">
										<p className="schedule__title mt-4 text-center font-primary-font">
											내 일정을 입력해보세요
										</p>
										<div className="scheduleList w-full my-4 text-center flex flex-col justify-center">
											{myItemTitle.map((title, titleIndex) => (
												<MyScheduleItem
													key={titleIndex}
													title={title}
													index={titleIndex}
												/>
											))}
											{provided.placeholder}
										</div>
										<div className="btnContainer my-5 mx-auto flex flex-row justify-center gap-4">
											<EnrollSchedule />
											<EnrollSchedule />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default MySchedule;
