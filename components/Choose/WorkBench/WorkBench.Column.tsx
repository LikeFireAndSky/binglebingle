'use client';

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskType, ColumnType } from './WorkBench.type';

type Props = {
	column: ColumnType;
	tasks: TaskType[];
};

const WorkBenchColumn = ({ column, tasks }: Props) => {
	return (
		<div className="w-full bg-blue-gray-700">
			<h1>{column.title}</h1>
			<Droppable droppableId={column.id}>
				{(droppableProvided, droppableSnapshot) => (
					<div
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
						className="bg-white p-3"
					>
						{tasks.map((task, index) => (
							<Draggable key={task.id} draggableId={`${task.id}`} index={index}>
								{(draggableProvided, draggableSnapshot) => (
									<div
										ref={draggableProvided.innerRef}
										{...draggableProvided.draggableProps}
										{...draggableProvided.dragHandleProps}
										className="bg-second-color"
									>
										{task.content}
									</div>
								)}
							</Draggable>
						))}
						{droppableProvided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default WorkBenchColumn;
