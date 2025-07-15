import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from '../lib/urqlClient';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={urqlClient}>
      <Component {...pageProps} />
    </UrqlProvider>
  );
}

export default MyApp;