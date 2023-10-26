'use client';

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { WorkBenchProps } from './WorkBench.type';
import WorkBenchObjects from './WorkBench.Objects';

const WorkBenchSelection = ({ column, tasks }: WorkBenchProps) => {
	return (
		<div className="w-full bg-blue-gray-700 h-fit min-h-[20rem]">
			<h1>{column.title}</h1>
			<Droppable droppableId={column.id}>
				{(droppableProvided) => (
					<div
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
						className="flex flex-col gap-3 p-3"
					>
						{tasks.map((task, index) => (
							<Draggable key={task.id} draggableId={`${task.id}`} index={index}>
								{(draggableProvided, draggableSnapshot) => (
									<WorkBenchObjects
										draggableProvided={draggableProvided}
										task={task}
									/>
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

export default WorkBenchSelection;
