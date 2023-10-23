import { NextResponse, type NextMiddleware, NextRequest } from 'next/server';

const middleware: NextMiddleware = (req: NextRequest) => {
	const cookie = req.cookies.get('next-auth.session-token');

	const makeUrl = (pathname: string) => {
		const url = req.nextUrl.clone();
		url.pathname = pathname;
		return url;
	};

	if (cookie) {
		return NextResponse.next();
	}
	return NextResponse.redirect(makeUrl('/main'));
};

export const config = {
	matcher: '/mypage',
};

export default middleware;
