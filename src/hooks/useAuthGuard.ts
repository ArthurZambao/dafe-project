'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function useAuthGuard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setIsChecking(false);
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        Cookies.remove('token');
        setIsChecking(false);
        router.push('/login');
        return;
      }


      setIsChecking(false);
    } catch {
      Cookies.remove('token');
      setIsChecking(false);
      router.push('/login');
    }
  }, [router]);

  return isChecking;
}
