import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { app } from '@/lib/firebase.config';
import firebaseAdmin from '@/lib/firebase.admin';

// Dynamic 라우팅을 사용한는 이유는 signIn, callback, signOut을 자동으로 처리하기 위해서이다.

export const authOption: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRETS!,
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					uid: profile.id.toString(),
					username: profile.login,
					role: profile.user === 'admin' ? 'admin' : 'user',
				};
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRETS!,
			profile(profile) {
				return {
					id: profile.sub.toString(),
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					uid: profile.sub.toString(),
					username: profile.name,
					role: profile.user === 'admin' ? 'admin' : 'user',
				};
			},
		}),
	],

	adapter: FirestoreAdapter(firebaseAdmin),

	callbacks: {
		async session({ session, user }) {
			session.user.username = session.user.name;
			session.user.uid = user.id;
			return session;
		},

		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},

	secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOption);
