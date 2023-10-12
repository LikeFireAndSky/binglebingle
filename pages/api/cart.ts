import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = req;
	switch (method) {
		case 'GET':
			try {
				const param = req.query.param1;
				const data = await kv.get(param as string);
				res.status(200).json({ success: true, data });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const keyName = req.body.name;
				await kv.set(keyName, req.body);
				res.status(201).json({ success: true });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
