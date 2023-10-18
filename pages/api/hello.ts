import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const sendingData = {
		인사: '안녕하세요',
	};
	res.status(200).json({ success: true, sendingData });
}
