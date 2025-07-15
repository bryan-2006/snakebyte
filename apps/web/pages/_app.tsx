import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from '../src/lib/urqlClient';
import '../styles/globals.css'
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={urqlClient}>
      <Component {...pageProps} />
    </UrqlProvider>
  );
}

export default MyApp;