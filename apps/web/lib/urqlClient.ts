import { createClient, debugExchange, cacheExchange, fetchExchange } from 'urql';

export const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql',
  exchanges: [debugExchange, cacheExchange, fetchExchange],
});