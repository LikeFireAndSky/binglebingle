import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import model from '@/model/model';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await dbConnect();
	try {
		const data = await model.find({});
		res.status(201).json({ success: true, data });
	} catch (error) {
		res.status(400).json({ success: false });
	}
}
