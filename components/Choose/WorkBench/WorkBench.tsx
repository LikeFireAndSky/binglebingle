'use client';

import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import initialData from './WorkBench.data';

type ColumnType = {
	id: string;
	title: string;
	taskIds: string[];
};

interface Root {
	'column-1': Column1;
	'column-2': Column2;
	'column-3': Column3;
}

export interface Column1 {
	id: string;
	title: string;
	taskIds: string[];
}

export interface Column2 {
	id: string;
	title: string;
	taskIds: string[];
}

export interface Column3 {
	id: string;
	title: string;
	taskIds: any[];
}

const WorkBench = () => {
	const [data, setData] = React.useState(initialData);

	const onDragEnd = (result: any) => {
		const { destination, source } = result;
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="w-full bg-deep-orange-300 h-96 flex justify-between">
				{data.columnOrder.map((columnId: string) => {
					return null;
				})}
			</div>
		</DragDropContext>
	);
};

export default WorkBench;
