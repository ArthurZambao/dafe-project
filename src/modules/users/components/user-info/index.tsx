'use client';

import { useAuth } from '@/global/context/useAuth';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function UserInfo() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center justify-between mb-2 gap-6 sm:gap-0">
      <div className="flex items-center gap-3">
        <Image width={200} height={200} src="/icons/ig-logo.svg" alt="Foto do Usuário" />
        <div>
          <p className="text-lg sm:text-3xl font-semibold">{user.usuario}</p>
          <p className="text-md sm:text-2xl text-slate-gray leading-none">{user.instituicao}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Link href="/users/edit-user">
          <Pencil className="w-4 h-4 text-azure-primary cursor-pointer" />
        </Link>
        <span className="text-xs sm:text-sm font-medium">{user.modulo}º Ano do Ensino Médio</span>

        <span className="text-xs sm:text-sm font-medium mr-4">
          <span className="hidden sm:block">{user.curso}</span>
        </span>
      </div>
    </div>
  );
}
