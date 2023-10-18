import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			name?: string;
			email?: string;
			image?: string;
			accessToken?: string;
			uid: string;
			username?: string;
		} & DefaultUser;
	}

	interface User extends DefaultUser {
		role?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id?: string;
		role?: string;
	}
}
