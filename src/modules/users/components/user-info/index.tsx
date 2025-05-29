'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Cookies from 'js-cookie';

interface JwtPayload {
  usuario: string;
  instituicao: string;
  id: string;
  modulo: string;
  curso: string;
}

export function UserInfo() {
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

  if (!user) return null;

  return (
    <div className="flex items-center justify-between mb-2 gap-6 sm:gap-0">
      <div className="flex items-center gap-3">
        <Image width={200} height={200} src="/icons/ig-logo.svg" alt="Foto do Usuário" />
        <div>
          <p className="text-lg sm:text-3xl font-semibold">{user.usuario}</p>
          <p className="text-md sm:text-2xl text-[#6C757D] leading-none">{user.instituicao}</p>
          <p className="text-xs sm:text-xl text-[#6C757D] leading-none">{user.id}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Pencil className="w-4 h-4 text-[#007BFF] cursor-pointer" />
        <span className="text-xs sm:text-sm font-medium">{user.modulo}º Ano do Ensino Médio</span>

        <span className="text-xs sm:text-sm font-medium mr-4">
          <span className="hidden sm:block">{user.curso}</span>
        </span>
      </div>
    </div>
  );
}
