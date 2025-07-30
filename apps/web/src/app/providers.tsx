'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from '../lib/urqlClient';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <UrqlProvider value={urqlClient}>
        {children}
      </UrqlProvider>
    </SessionProvider>
  );
}