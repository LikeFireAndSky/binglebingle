import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase.config';
import { getDocs, collection, getDoc, query } from 'firebase/firestore';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// DB에서 모든 데이터를 가져오는 API
	const { userUid } = req.query;
	try {
		const querySnapshot = await getDocs(collection(db, 'users'));
		const returnData = querySnapshot.docs.map((doc) => doc.data());
		res.status(200).json(returnData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export default handler;
