import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/global/components/NavBar';
import { Footer } from '@/global/components/Footer';
import { Montserrat_Alternates } from 'next/font/google';
import { Toaster } from 'sonner';

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  weight: '500',
});

export const metadata: Metadata = {
  title: {
    default: 'DAFE',
    template: 'DAFE | %s',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/icons/dafe-logo.svg" type="image/svg+xml" />
      </head>
      <body className={`antialiased ${montserratAlternates.className}`}>
        <NavBar />
        <main className="pt-30">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
