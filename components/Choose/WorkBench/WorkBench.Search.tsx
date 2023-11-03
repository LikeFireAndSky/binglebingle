'use client';

import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Typography } from '@material-tailwind/react';
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

const WorkBenchSearch = ({ column, tasks }: InitialDataType) => {
	return (
		<div className="w-full bg-primary-color h-20 ">
			<Droppable droppableId={column.id} ignoreContainerClipping>
				{(droppableProvided) => (
					<div
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
						className="flex justify-center gap-3 p-3 "
					>
						{/* <Typography color="white" variant="h5">
							검색을 원하면 여기로 드래그 해주세요
						</Typography> */}
						{droppableProvided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default WorkBenchSearch;
