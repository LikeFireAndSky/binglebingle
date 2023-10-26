import { DraggableProvided } from '@hello-pangea/dnd';

export type ColumnType = {
	id: string;
	title: string;
	taskIds: string[];
};

export type WorkBenchProps = {
	column: ColumnType;
	tasks: TaskType[];
};

export type WorkBenchObjectsProps = {
	draggableProvided: DraggableProvided;
	task: TaskType;
};

// column-1, column-2, column-3 중 하나만 할당 가능
export type TypeKeyofColumn = 'column-1';

export type TypeKeyofTask = 'task-1';

export type TaskType = {
	id: number;
	content: string;
};

// 제너릭의 KEY를 속성으로, 제너릭의 TYPE을 속성값의 타입을 ㅗ지정하는 새로운 타입을 반환
export type TypeColumns = {
	[key: string]: ColumnType;
};

export type TypeKeyofColumns = keyof TypeColumns;

export type TypeColumn = Record<TypeKeyofColumn & TypeKeyofColumns, ColumnType>;

export type TypeKeyofColumnType = keyof ColumnType;

export type TasksType = Record<TypeKeyofColumns & TypeKeyofColumns, TaskType>;
