'use client';

import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import initialData from './WorkBench.data';
import { TypeKeyofColumn, TypeKeyofTask } from './WorkBench.type';
import WorkBenchColumn from './WorkBench.Column';

const WorkBench = () => {
	const [data, setData] = React.useState(initialData);

	const onDragEnd = (result: any) => {
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
				...sourceColumn,
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

		const sourceTaskIds = Array.from(sourceColumn.taskIds);
		const [removed] = sourceTaskIds.splice(source.index, 1);
		const newSourceColumn = {
			...sourceColumn,
			taskIds: sourceTaskIds,
		};

		const destinationTaskIds = Array.from(destinationColumn.taskIds);
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

		// If the user moves from one column to another
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="w-full bg-deep-orange-300 h-96 grid gird-flow-row md:grid-flow-col gap-5">
				{data.columnOrder.map((columnId) => {
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
		</DragDropContext>
	);
};

export default WorkBench;
