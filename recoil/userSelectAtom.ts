import { atom, selector } from 'recoil';

const tasksAtom = atom({
	key: 'userSelectAtom',
	default: [],
});

const tasksSelector = selector({
	key: 'tasksSelector',
	get: ({ get }) => {
		const tasks = get(tasksAtom);

		return tasks;
	},
});

export default tasksAtom;
