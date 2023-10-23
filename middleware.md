import { NextResponse, type NextMiddleware, NextRequest } from 'next/server';

const middleware: NextMiddleware = (req: NextRequest) => {
	const cookieBasedEnv =
		process.env.NODE_ENV === 'production'
			? '__Secure-next-auth.session-token'
			: 'next-auth.session-token';
	const cookie = req.cookies.get(cookieBasedEnv);

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
