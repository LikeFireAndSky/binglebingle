'use client';

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardBody } from '@material-tailwind/react';
import { WorkBenchProps } from './WorkBench.type';
import WorkBenchObjects from './WorkBench.Objects';

const WorkBenchColumn = ({ column, tasks }: WorkBenchProps) => {
	return (
		<Card className="h-full w-full">
			<h1>{column.title}</h1>
			<Droppable droppableId={column.id}>
				{(droppableProvided) => (
					<CardBody
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
						className="bg-white p-3 flex flex-col gap-3"
					>
						{tasks.map((task, index) => (
							<Draggable key={task.id} draggableId={`${task.id}`} index={index}>
								{(draggableProvided) => (
									<WorkBenchObjects
										draggableProvided={draggableProvided}
										task={task}
									/>
								)}
							</Draggable>
						))}
						{droppableProvided.placeholder}
					</CardBody>
				)}
			</Droppable>
		</Card>
	);
};

export default WorkBenchColumn;
