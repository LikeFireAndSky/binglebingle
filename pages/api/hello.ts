import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const sendingData = {
		name: 'John',
		age: 30,
		email: 'asdf@gamil.com',
	};
	res.status(200).json({ success: true, sendingData });
}
