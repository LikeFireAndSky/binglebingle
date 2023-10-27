'use client';

// react
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// calendar 관련 components
// import MyCalendar from '@/components/Calendar/Calendar';

// custom components
import EnrollSchedule from '@/components/Calendar/EnrollSchedule';

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
	const [tripList, setTripList] = useState<Trip[]>([]);
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
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const newTripList = [...tripList];
		const movedItem = newTripList.find((item) => item.trip_id === draggableId);

		if (movedItem) {
			movedItem.trip_schedule = parseInt(
				destination.droppableId.split('-')[1],
				10,
			);
		}
		setTripList(newTripList);
		console.log(newTripList);
		console.log('성공');
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
									<CustomCalendar newTripList={tripList} />
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
											{/* <EnrollSchedule />
											<EnrollSchedule /> */}
											<button
												className="addSchedule w-full mx-auto mt-5 bg-black border-2 border-black rounded-lg text-white text-sm"
												onClick={() => router.push('/page')}
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
