import { atom } from 'recoil';

const userSelectAtom = atom({
	key: 'userSelectAtom',
	default: {
		name: '',
		email: '',
		location: '',
	},
});

export default userSelectAtom;
