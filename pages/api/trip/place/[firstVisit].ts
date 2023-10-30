import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase.config';
import { doc, getDoc } from 'firebase/firestore';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const { firstVisit } = req.query;
			const collectionName = 'trip_location/suwon/suwon_location';
			const dataId = `suwon-${firstVisit}`;

			const docRef = doc(db, collectionName, dataId);
			const docSnap = await getDoc(docRef);
			return res.status(200).json({ data: docSnap.data() });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}
};

export default handler;
