'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface JwtPayload {
  usuario: string;
  instituicao: string;
  id: string;
  modulo: string;
  curso: string;
}

//sempre usar com um "if (!user) return null; " para evitar o erro de renderização do componente antes do usuário ser carregado

export function useUser() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
      }
    }
  }, []);

  return user;
}
