import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/global/components/NavBar';
import { Footer } from '@/global/components/Footer';

export const metadata: Metadata = {
  title: 'DAFE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
