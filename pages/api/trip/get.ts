import { NextApiRequest, NextApiResponse } from 'next';
import { getDocs, collection, getDoc, query } from 'firebase/firestore';
import { db } from '@/lib/firebase.config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// DB에서 모든 데이터를 가져오는 API
	try {
		const querySnapshot = await getDocs(collection(db, 'TRIP_COLLECTION'));
		const returnData = querySnapshot.docs.map((doc) => doc.data());
		res.status(200).json(returnData);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export default handler;
