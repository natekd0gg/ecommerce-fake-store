import './globals.css';
import { Urbanist } from 'next/font/google';

import { CartProvider } from '@/components/CartContext';
import ToastProvider from '@/providers/toast-providers';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const font = Urbanist({ subsets: ['latin'] });

export const metadata = {
  title: 'Fake Store',
  description: 'Fake Store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <CartProvider>
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
