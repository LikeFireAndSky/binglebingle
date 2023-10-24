export type ColumnType = {
	id: string;
	title: string;
	taskIds: string[];
};

// column-1, column-2, column-3 중 하나만 할당 가능
export type TypeKeyofColumn = 'column-1' | 'column-2' | 'column-3';

export type TypeKeyofTask =
	| 'task-1'
	| 'task-2'
	| 'task-3'
	| 'task-4'
	| 'task-5'
	| 'task-6';

export type TaskType = {
	id: number;
	content: string;
};

// 제너릭의 KEY를 속성으로, 제너릭의 TYPE을 속성값의 타입을 ㅗ지정하는 새로운 타입을 반환
export type TypeColumn = Record<TypeKeyofColumn, ColumnType>;

export type TypeKeyofColumnType = keyof ColumnType;

export type TasksType = Record<TypeKeyofTask, TaskType>;
