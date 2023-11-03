'use client';

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import WorkBenchObjects from './WorkBench.Objects';

interface Task {
	id: number;
	content: string;
	name?: string;
}
interface Column {
	id: string;
	title: string;
	taskIds: number[];
}

type InitialDataType = {
	tasks: Task[];
	column: Column;
};

const WorkBenchSelection = ({ column, tasks }: InitialDataType) => {
	return (
		<Droppable droppableId={column.id} direction="horizontal">
			{(droppableProvided) => (
				<div
					ref={droppableProvided.innerRef}
					{...droppableProvided.droppableProps}
					className="w-full flex flex-wrap border-2 gap-x-2 p-3 min-h-[6rem] sm:min-h-[15rem] overflow-scroll overflow-x-hidden rounded-t-md"
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
				</div>
			)}
		</Droppable>
	);
};

export default WorkBenchSelection;
