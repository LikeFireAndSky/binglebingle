'use client';

import React, { useCallback } from 'react';
import { Button } from '@material-tailwind/react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TypeKeyofColumn, TypeKeyofTask } from './WorkBench.type';
import WorkBenchColumn from './WorkBench.Column';
import WorkBenchSelection from './WorkBench.Selection';

type Props = {
	initialData: Task[];
};

interface Task {
	id: number;
	content: string;
	name?: string;
}

const fetchAddedData = async (query: number) => {
	const res = await axios.get(`/api/trip/place/${query}`);
	const data = await res.data;
	return data;
};

const WorkBench = React.memo(({ initialData }: Props) => {
	const [searchQuery, setSearchQuery] = React.useState<number>();
	const { data: newData } = useQuery(
		['query'],
		() => fetchAddedData(searchQuery as number),
		{
			cacheTime: 1000 * 60 * 5,
			enabled: !!searchQuery,
		},
	);

	const addNewData = useCallback(() => {}, []);

	console.log(newData);

	//	const [data, setData] = React.useState(initialDatas);

	const idMap = initialData.map((item: Task, index: number) => {
		return {
			id: index,
			content: item.name as string,
		};
	});
	const [data, setData] = React.useState({
		tasks: idMap,
		columns: {
			'column-1': {
				id: 'column-1',
				title: '선택한 장소',
				taskIds: idMap.map((item) => item.id),
			},
			'Search-column': {
				id: 'Search-column',
				title: '첫째날',
				taskIds: [],
			},
			'column-3': {
				id: 'column-3',
				title: '추천 장소',
				taskIds: [],
			},
		},
		columnOrder: ['column-1', 'Search-column', 'column-3'],
	});

	const onDragEnd = useCallback(
		(result: DropResult) => {
			const { destination, source } = result;

			// If user tries to drop in an unknown destination
			if (!destination) return null;

			// If the user drags and drops back in the same position
			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			)
				return null;

			// If the user drops within the same column but in a different position
			const sourceColumn = data.columns[source.droppableId as TypeKeyofColumn];
			const destinationColumn =
				data.columns[destination.droppableId as TypeKeyofColumn];

			if (sourceColumn.id === destinationColumn.id) {
				const newTaskIds = Array.from(sourceColumn.taskIds);
				const [removed] = newTaskIds.splice(source.index, 1);
				newTaskIds.splice(destination.index, 0, removed);

				const newColumn = {
					...destinationColumn,
					taskIds: newTaskIds,
				};

				const newState = {
					...data,
					columns: {
						...data.columns,
						[newColumn.id]: newColumn,
					},
				};
				setData(newState);
				return null;
			}

			// If the user moves from one column to another
			const sourceTaskIds = Array.from(sourceColumn.taskIds);
			const destinationTaskIds = Array.from(destinationColumn.taskIds);

			// If the user drops in the Search column
			if (destination.droppableId === 'Search-column') {
				const newQuery = data.tasks[sourceTaskIds[source.index]].content;
				const newQueryId = initialData.find((item) => item.name === newQuery)
					?.id as number;
				setSearchQuery(newQueryId);
				return null;
			}

			const [removed] = sourceTaskIds.splice(source.index, 1);
			const newSourceColumn = {
				...sourceColumn,
				taskIds: sourceTaskIds,
			};

			destinationTaskIds.splice(destination.index, 0, removed);
			const newDestinationColumn = {
				...destinationColumn,
				taskIds: destinationTaskIds,
			};

			const newState = {
				...data,
				columns: {
					...data.columns,
					[newSourceColumn.id]: newSourceColumn,
					[newDestinationColumn.id]: newDestinationColumn,
				},
			};
			setData(newState);
		},
		[data, initialData],
	);

	const ondragstart = () => {
		// eslint-disable-next-line
		console.log('drag start');
	};

	const ondragbefore = () => {
		// eslint-disable-next-line
		console.log('drag before');
	};

	const firstDataColumn = data.columns['column-1'];
	const firstDataColumnTasks = firstDataColumn.taskIds.map((taskId: number) => {
		const task = data.tasks[taskId];
		return task;
	});

	const secondDataColumn = data.columns['Search-column'];
	const secondDataColumnTasks = secondDataColumn.taskIds.map(
		(taskId: number) => {
			const task = data.tasks[taskId];
			return task;
		},
	);

	return (
		<DragDropContext
			onDragEnd={onDragEnd}
			onDragStart={ondragstart}
			onBeforeDragStart={ondragbefore}
		>
			<div className="w-full">
				<div className="">
					{data.columnOrder.slice(2).map((columnId) => {
						const column = data.columns[columnId as TypeKeyofColumn];
						const tasks = column.taskIds.map((taskId: number) => {
							const task = data.tasks[taskId];
							return task;
						});
						return (
							<WorkBenchColumn key={column.id} column={column} tasks={tasks} />
						);
					})}
				</div>
				<div className="bg-deep-orange-300">
					<WorkBenchSelection
						column={firstDataColumn}
						tasks={firstDataColumnTasks}
					/>
				</div>
				<div className="bg-deep-orange-700 absolute mt-20 mx-auto flex flex-col items-center w-full">
					<h1>더보기 리그</h1>
					<WorkBenchSelection
						column={secondDataColumn}
						tasks={secondDataColumnTasks}
					/>
					<Button
						onClick={() => {
							console.log(data);
						}}
						type="button"
					>
						버튼
					</Button>
				</div>
			</div>
		</DragDropContext>
	);
});

export default WorkBench;
