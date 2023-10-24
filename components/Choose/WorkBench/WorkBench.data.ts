const initialData = {
	tasks: {
		'task-1': { id: 1, content: 'Take out the garbage' },
		'task-2': { id: 2, content: 'Watch my favorite show' },
		'task-3': { id: 3, content: 'Charge my phone' },
		'task-4': { id: 4, content: 'Cook dinner' },
		'task-5': { id: 5, content: 'Sleep' },
		'task-6': { id: 6, content: 'BreakFirst' },
	},

	columns: {
		'column-1': {
			id: 'column-1',
			title: 'To do',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
		},
		'column-2': {
			id: 'column-2',
			title: 'In progress',
			taskIds: ['task-5', 'task-6'],
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			taskIds: [],
		},
	},
	columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
