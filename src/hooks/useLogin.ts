import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  interface LoginData {
    email: string;
    senha: string;
  }

  const login = async (data: LoginData, reset: () => void) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3030/login-jwt', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      Cookies.set('token', response.data.token, { expires: 7, sameSite: 'lax' });
      reset();

      router.push('/user-page');
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
