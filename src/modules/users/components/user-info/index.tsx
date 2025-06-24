'use client';

import { useAuth } from '@/global/context/useAuth';
import { JwtPayload } from '@/types/jwt';
import Image from 'next/image';

export function UserInfo() {
  const { user } = useAuth();
  if (!user) return null;

  const currentUser = user as JwtPayload;

  return (
    <div className="flex flex-col items-center justify-between mb-2 gap-6 sm:gap-0 pb-20 select-none">
      <Image width={200} height={200} src="/icons/ig-logo.svg" alt="Foto do Usuário" />
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-3xl font-medium">Bem-Vindo {currentUser.usuario}</h2>
        <h3 className="text-xl">{currentUser.instituicao}</h3>
        <p>
          {currentUser.modulo}º Ano do curso de {currentUser.curso}
        </p>
      </div>
    </div>
  );
}
