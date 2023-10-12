import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

// Dynamic 라우팅을 사용한는 이유는 signIn, callback, signOut을 자동으로 처리하기 위해서이다.

export const authOption: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRETS!,
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRETS!,
		}),
	],

	callbacks: {
		async session({ session, token, user }: any) {
			session.user.username = session?.user?.name
				.split(' ')
				.join('')
				.toLocaleLowerCase();

			session.user.uid = token.sub;
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOption);
