'use client';

import React, { useCallback, useEffect } from 'react';
import {
	DragDropContext,
	DropResult,
	DraggableLocation,
} from '@hello-pangea/dnd';
import axios from 'axios';
import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { TypeKeyofColumn, ColumnType } from './WorkBench.type';
import WorkBenchColumn from './WorkBench.Column';
import WorkBenchSelection from './WorkBench.Selection';
import WorkBenchSearch from './WorkBench.Search';

type Props = {
	initialData: Task[];
};

interface Task {
	id: number;
	content: string;
	name?: string;
}

const Box = () => {
	return (
		<mesh>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="hotpink" />
		</mesh>
	);
};

// 데이터
const fetchAddedData = async (query: number) => {
	const res = await axios.get(`/api/trip/place/${query}`);
	const data = await res.data;
	return data;
};

const isUnknownDestination = (
	destination: DraggableLocation | null,
): destination is null => {
	return destination === null;
};

const isSamePosition = (
	destination: DraggableLocation,
	source: DraggableLocation,
) => {
	if (
		destination.droppableId === source.droppableId &&
		destination.index === source.index
	)
		return true;
	return false;
};

const makeColumn = (colmunOfData: any, dataId: string) => {
	const newColumn = colmunOfData[dataId];
	return newColumn;
};

const makeNewTaskIds = (column: ColumnType) => {
	const newTaskIds = Array.from(column.taskIds);
	return newTaskIds;
};

const spliceColumn = (columnArray: number[], sourceIndex: number) => {
	const [removed] = columnArray.splice(sourceIndex, 1);
	return removed;
};

const spliceAddColumn = (
	columnArray: number[],
	sourceIndex: number,
	removed: number,
) => {
	columnArray.splice(sourceIndex, 0, removed);
	return columnArray;
};

const makeNewColumn = (column: ColumnType, tastIds: number[]) => {
	const newColumn = {
		...column,
		taskIds: tastIds,
	};
	return newColumn;
};

const makeIdMap = (initialData: Task[], indexStartNum?: number) => {
	const idMap = initialData.map((item, index: number) => {
		return {
			id: indexStartNum ? index + indexStartNum : index,
			content: item.name as string,
			dataId: item.id,
		};
	});
	return idMap;
};

const makeNewState = (
	originState: any,
	newSourceColumn: ColumnType,
	setStateCallback: (newState: any) => void,
	newTasks?: Task[],
	newDestinationColumn?: ColumnType,
) => {
	const newState = {
		tasks: newTasks ? originState.tasks + newTasks : originState.tasks,
		columns: {
			...originState.columns,
			[newSourceColumn.id]: newSourceColumn,
			[newDestinationColumn?.id as string]: newDestinationColumn,
		},
		columnOrder: originState.columnOrder,
	};
	setStateCallback(newState);
};

const WorkBench = React.memo(({ initialData }: Props) => {
	const [searchQuery, setSearchQuery] = React.useState<number | null>(null);
	const idMap = makeIdMap(initialData);

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

	const {
		data: newData,
		refetch,
		isSuccess,
	} = useQuery(['query'], () => fetchAddedData(searchQuery as number), {
		staleTime: 1000 * 60 * 5,
		cacheTime: 1000 * 60 * 5,
		enabled: false,
		refetchOnWindowFocus: false,
	});

	const onDragEnd = useCallback(
		(result: DropResult) => {
			const { destination, source } = result;

			// If user tries to drop in an unknown destination
			// If the user drops within the same column but in a different position
			if (
				isUnknownDestination(destination) ||
				isSamePosition(destination as DraggableLocation, source)
			) {
				return null;
			}

			const sourceColumn = makeColumn(
				data.columns,
				source.droppableId,
			) as ColumnType;

			const destinationColumn = makeColumn(
				data.columns,
				destination.droppableId,
			) as ColumnType;

			const isSameColumn = sourceColumn.id === destinationColumn.id;

			if (isSameColumn) {
				const newTaskIds = makeNewTaskIds(sourceColumn);
				const removed = spliceColumn(newTaskIds, source.index);
				const newTaskIdsAdded = spliceAddColumn(
					newTaskIds,
					destination.index,
					removed,
				);

				const newColumn = makeNewColumn(sourceColumn, newTaskIdsAdded);

				makeNewState(data, newColumn, setData);

				return null;
			}

			// If the user moves from one column to another
			const sourceTaskIds = makeNewTaskIds(sourceColumn);
			const destinationTaskIds = makeNewTaskIds(destinationColumn);

			// If the user drops in the Search column
			if (destination.droppableId === 'Search-column') {
				const newQueryId = data.tasks[sourceTaskIds[source.index]].dataId;
				setSearchQuery(newQueryId);

				return null;
			}

			const removed = spliceColumn(sourceTaskIds, source.index);
			const newSourceColumn = makeNewColumn(sourceColumn, sourceTaskIds);

			const newDestinationIdsAdded = spliceAddColumn(
				destinationTaskIds,
				destination.index,
				removed,
			);

			const newDestinationColumn = makeNewColumn(
				destinationColumn,
				newDestinationIdsAdded,
			);

			makeNewState(
				data,
				newSourceColumn,
				setData,
				undefined,
				newDestinationColumn,
			);
		},
		[data],
	);

	useEffect(
		() => {
			refetch();
		},

		// eslint-disable-next-line
		[searchQuery],
	);

	useEffect(
		() => {
			if (isSuccess && newData && searchQuery !== null) {
				// 여기에 newData를 활용한 추가 코드를 작성할 수 있습니다.

				const items = newData?.data?.recommend_location;
				const dataColumnLength = data.tasks.length;
				const notDuplicatedIdMap = items.filter((item: any) => {
					return !data.tasks.some((task) => task.dataId === item.id);
				});
				const newIdMap = makeIdMap(notDuplicatedIdMap, dataColumnLength);

				const newTasks = [...data.tasks, ...newIdMap];
				const newTaskIds = newTasks.map((item) => item.id);
				const newColumn = makeNewColumn(data.columns['column-1'], newTaskIds);
				const newSetupData = {
					tasks: newTasks,
					columns: {
						...data.columns,
						'column-1': newColumn,
					},
					columnOrder: data.columnOrder,
				};
				console.log(data);
				setData(newSetupData);
			}
		},
		// eslint-disable-next-line
		[isSuccess, newData],
	);

	useEffect(() => {}, []);

	const firstDataColumn = makeColumn(data.columns, 'column-1');
	const firstDataColumnTasks = firstDataColumn.taskIds.map((taskId: number) => {
		const task = data.tasks[taskId];
		return task;
	});

	const secondDataColumn = makeColumn(data.columns, 'Search-column');
	const secondDataColumnTasks = secondDataColumn.taskIds.map(
		(taskId: number) => {
			const task = data.tasks[taskId];
			return task;
		},
	);

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className="w-full absolute bottom-0 z-10">
					<div className="">
						{data.columnOrder.slice(2).map((columnId) => {
							const column = data.columns[columnId as TypeKeyofColumn];
							const tasks = column.taskIds.map((taskId: number) => {
								const task = data.tasks[taskId];
								return task;
							});
							return (
								<WorkBenchColumn
									key={column.id}
									column={column}
									tasks={tasks}
								/>
							);
						})}
					</div>
					<WorkBenchSelection
						column={firstDataColumn}
						tasks={firstDataColumnTasks}
					/>
					<WorkBenchSearch
						column={secondDataColumn}
						tasks={secondDataColumnTasks}
					/>
				</div>
			</DragDropContext>
		</>
	);
});

export default WorkBench;
