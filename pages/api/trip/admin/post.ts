import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase.config';
import { setDoc, collection, doc } from 'firebase/firestore';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// DB에 데이터를 추가하는 API
	if (req.method === 'POST') {
		try {
			const { name, id } = req.body;
			const dataIds = `suwon-${id}`;
			const collectionName = 'trip_location/suwon/suwon_location';
			await setDoc(doc(db, collectionName, dataIds), req.body);

			return res.status(200).json({ message: `${dataIds}업데이트 성공` });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}
};

export default handler;
