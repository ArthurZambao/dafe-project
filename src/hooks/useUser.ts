'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface JwtPayload {
  nome: string;
  email: string;
  usuario: string;
  instituicao: string;
  id: string;
  modulo: string;
  curso: string;
}

// sempre usar com um 
// if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg text-gray-500">Carregando dados do usuário...</p>
//       </div>
//     );
//   }
//   const { id, nome, email, usuario, instituicao, curso, modulo } = user;
//  para evitar o erro de renderização do componente antes do usuário ser carregado

export function useUser() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log('Token bruto:', token);

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log('Token decodificado:', decoded); // <-- Veja se `id` existe aqui
        setUser(decoded);
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
      }
    }
  }, []);

  return user;
}
