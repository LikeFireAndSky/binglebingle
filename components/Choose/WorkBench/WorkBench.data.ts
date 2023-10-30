const initialData = {
	tasks: {
		'task-1': { id: 1, content: '화성행궁' },
		'task-2': { id: 2, content: '수원천' },
		'task-3': { id: 3, content: '플라잉 수원' },
		'task-4': { id: 4, content: '수원 시립 미술관 전시' },
		'task-5': { id: 5, content: '남문 통닭거리' },
		'task-6': { id: 6, content: '행궁 카페거리' },
	},

	columns: {
		'column-1': {
			id: 'column-1',
			title: '추천 여행지',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
		},
		'column-2': {
			id: 'column-2',
			title: '첫째날',
			taskIds: ['task-5', 'task-6'],
		},
		'column-3': {
			id: 'column-3',
			title: '둘째날',
			taskIds: [],
		},
		'column-4': {
			id: 'column-4',
			title: '셋째날',
			taskIds: [],
		},
	},
	columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default initialData;
