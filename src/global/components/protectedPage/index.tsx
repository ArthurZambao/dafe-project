'use client';

import { useAuthGuard } from '@/hooks/useAuthGuard';
import { ReactNode } from 'react';

interface ProtectedPageProps {
  children: ReactNode;
}

export function ProtectedPage({ children }: ProtectedPageProps) {
  const isChecking = useAuthGuard();

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-blue-600">
        Verificando autenticação...
      </div>
    );
  }

  return <>{children}</>;
}
