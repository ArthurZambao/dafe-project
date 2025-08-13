'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useAuth } from '@/global/context/useAuth';
import { api } from '@/libs/api/axios';

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUserFromToken } = useAuth();

  interface LoginData {
    email: string;
    senha: string;
  }

  const login = async (data: LoginData, reset: () => void) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/login-jwt', data);

      Cookies.set('token', response.data.token, { expires: 7, sameSite: 'lax' });
      setUserFromToken(response.data.token);
      reset();

      router.push('/forum-page');
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      let backendMessage = 'Erro ao entrar. Por favor, tente novamente mais tarde.';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string | string[] } } };
        const message = err.response?.data?.message;
        backendMessage = Array.isArray(message) ? message.join(' ') : (message || backendMessage);
      }
      toast.error(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    login,
    isSubmitting,
  };
}
