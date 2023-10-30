'use client';

import React from 'react';
import { Chip } from '@material-tailwind/react';
import { WorkBenchObjectsProps } from './WorkBench.type';

const WorkBenchObjects = ({
	draggableProvided,
	task,
}: WorkBenchObjectsProps) => {
	return (
		<div
			ref={draggableProvided.innerRef}
			{...draggableProvided.draggableProps}
			{...draggableProvided.dragHandleProps}
			className="w-fit"
		>
			<Chip className="bg-brown-700" value={task.content} />
		</div>
	);
};

export default WorkBenchObjects;
