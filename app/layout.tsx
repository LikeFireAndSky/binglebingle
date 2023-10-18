import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionProvider from '@/components/Provider/SessionProvider';
import ClientProviders from '@/components/Provider/ClientProvider';
import { getServerSession } from 'next-auth';
import Header from '@/components/Header/Header';
import { authOption } from '@/pages/api/auth/[...nextauth]';

export const metadata: Metadata = {
	title: 'BingleBingle',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOption);

	return (
		<html lang="en">
			<head>
				<meta
					name="google-site-verification"
					content="4f8y4w_Y8lbcdEgfepLMiG1Lc9QhIvmIY6DvkrxEH3w"
				/>
			</head>
			<body>
				<SessionProvider session={session}>
					<ClientProviders>
						<Header />
						{children}
					</ClientProviders>
				</SessionProvider>
			</body>
		</html>
	);
}
