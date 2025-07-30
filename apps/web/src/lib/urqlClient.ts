import { createClient, cacheExchange, fetchExchange } from 'urql';
import { getSession } from 'next-auth/react';

export const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetch: async (input, init) => {
    const session = await getSession();
    
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        authorization: session?.user?.email ? `Bearer ${session.user.email}` : '',
      },
    });
  },
});