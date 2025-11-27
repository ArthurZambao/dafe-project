'use client';

import { useAuth } from '@/global/context/useAuth';
import Image from 'next/image';

const DEFAULT_AVATAR = '/icons/user-icon.svg';

export function UserInfo() {
  const { user } = useAuth();

  if (!user) return null;
  console.log('UserInfo - Dados do Usuário:', user);
  console.log('UserInfo - URL da Imagem:', user.imageUrl);
  const profileImageUrl = user.imageUrl || DEFAULT_AVATAR;

  return (
    <div className="flex flex-col items-center justify-between mb-2 gap-6 sm:gap-0 pb-10 select-none">
      <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded,full overflow-hidden rounded-full">
        <Image
          width={200}
          height={200}
          src={profileImageUrl}
          alt="Foto do Usuário"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-xl sm:text-3xl font-medium text-center sm:text-left">
          Bem-Vindo
          <br className="block sm:hidden" /> {user.usuario}
        </h2>

        {user.role === 'student' ? (
          <>
            <h3 className="text-xl">Estudante da {user.instituicao}</h3>
            <p>
              {user.modulo}º Ano do curso de {user.curso}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl">Professor da {user.instituicao}</h3>
          </>
        )}
      </div>
    </div>
  );
}
