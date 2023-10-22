import { NextApiRequest, NextApiResponse } from 'next';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase.config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// DB에서 유저 정보 가져오는 API

	if (req.method === 'GET') {
		try {
			const { userUid } = req.query;
			console.log(userUid);
			const docRef = doc(db, 'users', userUid as string);
			const returnData = await getDoc(docRef);
			if (!returnData) {
				res.status(404).json({ message: 'Not Found' });
			} else {
				res.status(200).json(returnData);
			}
		} catch (error) {
			res.status(500).json({ message: error });
		}

		res.status(200).json({ message: 'Not Found' });
	}
};

export default handler;
