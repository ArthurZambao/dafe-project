import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/global/components/NavBar';
import { Footer } from '@/global/components/Footer';
import { Montserrat_Alternates } from 'next/font/google';

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  weight: '500',
});

export const metadata: Metadata = {
  title: 'DAFE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased ${montserratAlternates.className}`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
