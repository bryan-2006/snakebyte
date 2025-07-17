import '../../styles/global.css';
import { Providers } from './providers';
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
    <html lang="en">
      <body suppressHydrationWarning={true} className='dark'>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
