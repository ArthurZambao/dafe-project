import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/global/components/HeaderComponents/NavBar';
import { Footer } from '@/global/components/Footer';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/global/context/useAuth';

const inter = Inter({
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
      <body className={`antialiased ${inter.className}`}>
        <AuthProvider>
          <NavBar />
          <main className="pt-26">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            theme="light"
            toastOptions={{
              classNames: {
                toast: 'bg-white text-azure-primary border border-gray-200 shadow-lg',
                title: 'font-bold text-azure-primary',
                description: 'text-sm text-azure-primary',
                actionButton: 'bg-azure-primary text-white px-2 py-1 rounded',
                cancelButton: 'text-gray-500',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
