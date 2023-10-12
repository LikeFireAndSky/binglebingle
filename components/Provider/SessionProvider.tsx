'use client';

import React, { ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

type SessionProviderProps = {
	session: Session | null;
	children: ReactNode;
};

const SessionProvider = ({ session, children }: SessionProviderProps) => {
	return <Provider session={session}>{children}</Provider>;
};

export default SessionProvider;
