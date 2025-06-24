'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getValidToken } from '@/global/utils/auth';
import { ReactNode } from 'react';

interface AuthGateProps {
  children: ReactNode;
  mode: 'auth' | 'guest';
  redirectTo?: string;
}

export function AuthGate({ children, mode, redirectTo }: AuthGateProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getValidToken();

      if (mode === 'auth') {
        if (!token) {
          router.replace(redirectTo || '/login');
        } else {
          setIsAllowed(true);
        }
      }

      if (mode === 'guest') {
        if (token) {
          router.replace(redirectTo || '/');
        } else {
          setIsAllowed(true);
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [mode, redirectTo, router]);

  if (isChecking || !isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-blue-600">
        Verificando autenticação...
      </div>
    );
  }

  return <>{children}</>;
}
