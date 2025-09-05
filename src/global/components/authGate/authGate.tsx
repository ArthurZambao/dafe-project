'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getValidToken } from '@/global/utils/auth';
import { AuthGateProps } from '@/types/authGate';
import { useAuth } from '@/global/context/useAuth';
import { toast } from 'sonner';

export function AuthGate({ children, mode, role, redirectTo }: AuthGateProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const token = getValidToken();

    if (mode === 'auth') {
      if (!token) {
        router.replace(redirectTo || '/login');
        toast.error('Você precisa estar logado para acessar essa página.');
      } else {
        if (role && user && user.role !== role) {
          router.replace('/'); 
          toast.error('Você não tem permissão para acessar essa página.');
        } else {
          setIsAllowed(true);
        }
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
  }, [mode, role, redirectTo, router, user]);

  if (!user && mode === 'auth') return null;

  if (isChecking || !isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-blue-600">
        Verificando autenticação...
      </div>
    );
  }

  return <>{children}</>;
}
