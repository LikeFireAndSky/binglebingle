import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import model from '@/model/model';

export default async function addPost(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await dbConnect();
	const { method } = req;
	const { title, content } = req.body;

	if (method === 'POST') {
		model.create({ title, content });
	}

	return res.json({ success: true });
}
