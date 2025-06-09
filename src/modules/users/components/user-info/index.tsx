'use client';

import { useAuth } from '@/global/context/useAuth';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function UserInfo() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-between mb-2 gap-6 sm:gap-0 pb-20 select-none">
      <Image width={200} height={200} src="/icons/ig-logo.svg" alt="Foto do Usuário" />
      <div className='flex flex-col gap-5 items-center'>
        <h2 className='text-3xl font-medium'>Bem-Vindo {user.usuario}</h2>
        <h3 className='text-xl'>{user.instituicao}</h3>
        <p>{user.modulo}º Ano do curso de {user.curso}</p>
      </div>
    </div>
  );
}
