'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getValidToken } from '@/global/utils/auth';

export function useAuthGuard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = getValidToken();

    if (!token) {
      router.push('/login');
    }
    setIsChecking(false);
  }, [router]);

  return isChecking;
}
