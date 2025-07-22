import '../../styles/global.css';
import { Providers } from './providers';
import { StripeProvider } from '../components/StripeProvider';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'SnakeByte',
  description: 'Learn to code in a fun, interactive way!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning={true} className="dark">
        <Providers>
          <StripeProvider>
            <Navbar />
            {children}
          </StripeProvider>
        </Providers>
      </body>
    </html>
  );
}
