'use client';

import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import initialData from './WorkBench.data';
import { TypeKeyofColumn, TypeKeyofTask } from './WorkBench.type';
import WorkBenchColumn from './WorkBench.Column';

const WorkBench = () => {
	const [data, setData] = React.useState(initialData);

	const onDragEnd = (result: DropResult) => {
		const { destination, source, reason, draggableId, type, mode, combine } =
			result;

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
		console.log('sourceTaskIds', sourceTaskIds);
		const [removed] = sourceTaskIds.splice(source.index, 1);
		const newSourceColumn = {
			...sourceColumn,
			taskIds: sourceTaskIds,
		};

		const destinationTaskIds = Array.from(destinationColumn.taskIds);
		console.log('변경 전destinationTaskIds', destinationTaskIds);
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
	};

	const ondragstart = () => {
		console.log('drag start');
	};

	const ondragbefore = () => {
		console.log('drag before');
	};

	const firstDataColumn = data.columns[data.columnOrder[0] as TypeKeyofColumn];
	const firstDataColumnTasks = firstDataColumn.taskIds.map((taskId) => {
		const task = data.tasks[taskId as TypeKeyofTask];
		return task;
	});

	return (
		<DragDropContext
			onDragEnd={onDragEnd}
			onDragStart={ondragstart}
			onBeforeDragStart={ondragbefore}
		>
			<div className="w-full bg-deep-orange-300 h-96 flex flex-col md:grid-flow-col gap-5">
				<div className="w-full grid grid-flow-col">
					{data.columnOrder.slice(1).map((columnId) => {
						const column = data.columns[columnId as TypeKeyofColumn];
						const tasks = column.taskIds.map((taskId) => {
							const task = data.tasks[taskId as TypeKeyofTask];
							return task;
						});
						return (
							<WorkBenchColumn key={column.id} column={column} tasks={tasks} />
						);
					})}
				</div>
				<div className="w-full h-full bg-deep-orange-300">
					<WorkBenchColumn
						column={firstDataColumn}
						tasks={firstDataColumnTasks}
					/>
				</div>
			</div>
		</DragDropContext>
	);
};

export default WorkBench;
