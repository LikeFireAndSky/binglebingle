'use client';

// react
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import _ from 'lodash';

// calendar 관련 components
// import MyCalendar from '@/components/Calendar/Calendar';

/* 드래그 기능 추가 시 필요한 import 구문 */
// import { DragDropContext } from 'react-beautiful-dnd';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useSession } from 'next-auth/react';
import CustomCalendar from '@/components/Calendar/CustomCalendar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MyScheduleItem from '@/components/Calendar/MyScheduleItem';
import { Trip, UserData } from '@/interfaces/myschedule';

const getUserData = async (userUid: string) => {
	const res = await axios.get(`/api/user/get?userUid=${userUid}`);
	const userData: UserData = res.data;
	return userData;
};

const queryOptions = {
	staleTime: 1000 * 60 * 5, // 5분
	cacheTime: 1000 * 60 * 5, // 5분
};

const MySchedule = () => {
	const [tripList, setTripList] = useState<Trip[]>([]); // firebase에서 MyScheduleItem 가져오는 데이터 저장
	const [updatedList, setUpdatedList] = useState<Trip[]>([]); // 달력에 옮길 MyscheduleItem 모음
	const router = useRouter();
	const { data: session } = useSession();

	const userUid = session?.user?.uid as string;
	const { data, error, isLoading } = useQuery(
		[userUid],
		() => getUserData(userUid),
		queryOptions,
	);

	useEffect(() => {
		if (data && data.trip_list) {
			setTripList(data.trip_list);
			setUpdatedList(data.trip_list);
		}
	}, [data]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>error</div>;
	}
	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;
		// 만약 드롭 하지 않았으면 넘어감
		if (!destination) {
			return;
		}
		// 만약 드래그 한 곳에 그냥 다시 드롭하면 넘어감
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		// find로 draggableId와 같은 trip_id 찾음 (draggableId = trip.trip_id)
		const draggedItem = tripList.find((item) => item.trip_id === draggableId);

		// 만약 드래그 했으면 달력에 특정 날짜에 넣기 위해 특정 날짜를 지칭하는 day 속성 추가
		if (draggedItem) {
			const dayNumber = parseInt(
				destination.droppableId.replace('droppable-', ''),
				10,
			);
			const updatedItem = { ...draggedItem, day: dayNumber }; // day 속성 추가해서 dayNumber 넣어줌
			const newUpdatedList = [...updatedList, updatedItem]; // customCalendar에 전해줄 새로운 배열 만듦 -> firebase에 더함 예정

			// 드래그 한 것 제외한 나머지 배열 tripList로 업데이트 해줌
			const newTripList = tripList.filter(
				(item) => item.trip_id !== draggableId,
			);
			setUpdatedList(newUpdatedList);
			setTripList(newTripList);
		}
	};
	// 일단 다 삭제 하도록..
	const removeItem = () => {
		setTripList([]);
	};
	// useEffect(()=>{

	// },[tripList])
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="mySchedule">
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className="container mx-auto">
							<div className="flex flex-row justify-between">
								<div className="w-1/2 mt-20">
									<CustomCalendar updatedList={updatedList} />
									{provided.placeholder}
								</div>
								<div className="w-1/2 mt-20 ml-10 flex flex-col justify-center">
									<div className="enrollContainer w-1/2 flex flex-col justify-center mx-auto mt-4 border-solid border-4 border-black rounded-md">
										<p className="schedule__title mt-4 text-center font-primary-font">
											내 일정을 입력해보세요
										</p>
										<div className="scheduleList w-full my-4 text-center flex flex-col justify-center">
											{tripList.map((trip: Trip, index: number) => (
												<MyScheduleItem
													key={trip.trip_id}
													index={index}
													title={trip.trip_name}
													trip={trip}
												/>
											))}
											{provided.placeholder}
										</div>
										<div className="btnContainer my-5 mx-auto flex flex-row justify-center gap-4">
											<button
												className="addSchedule w-full mx-auto mt-5 bg-black border-2 border-black rounded-lg text-white text-sm"
												onClick={() => router.push('/choose')}
											>
												일정 추가
											</button>
											<button
												className="deleteSchedule w-full mx-auto mt-5 border-2 bg-black border-black rounded-lg text-white text-sm"
												onClick={removeItem}
											>
												일정 삭제
											</button>
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
