import '../../styles/global.css';
import { Providers } from './providers';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { CheckCircle, TriangleAlert} from 'lucide-react';

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
          <Navbar />
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#10b981',
                },
                icon: <CheckCircle className="h-4 w-4" />
              },
              error: {
                duration: 4000,
                style: {
                  background: '#ef4444',
                },
                icon: <TriangleAlert className="h-4 w-4" />
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}