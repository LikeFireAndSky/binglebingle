import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase.config';
import { collection, doc, getDocs } from 'firebase/firestore';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// DB에 데이터를 추가하는 API
	if (req.method === 'GET') {
		try {
			const collectionName = 'trip_location/suwon/suwon_location';
			const querySnapshot = await getDocs(collection(db, collectionName));
			const data = querySnapshot.docs.map((doc) => doc.data());
			return res.status(200).json({ data });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}
};

export default handler;
