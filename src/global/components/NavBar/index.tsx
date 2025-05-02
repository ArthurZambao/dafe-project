'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-[#007BFF] text-white flex justify-between p-6 mx-auto items-center relative select-none">
      <Link href="/landing-page">
        <Image width={220} height={220} src="/icons/dafe-logo.svg" alt="Dafe Logo" />
      </Link>

      <button className="block md:hidden ml-auto text-3xl" type="button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav>
        <ul className="hidden md:flex items-center space-x-10 text-xl">
          <li>
            <Link href="/landing-page" className="hover:underline">
              Início
            </Link>
          </li>
          <li>
            <Link href="/forum-page" className="hover:underline">
              Fórum
            </Link>
          </li>
          <li>
            <Link href="/notices-page" className="hover:underline">
              Notícias
            </Link>
          </li>
          <li>
            <Link href="/complaints" className="hover:underline">
              Denúncias
            </Link>
          </li>
          {/* <li>
            <Link href="#" className="hover:underline">
              Conversas
            </Link>
          </li> */}
          <li>
            {pathname === '/login' ? (
              <Link href="/register" className="hover:underline">
                Cadastrar-se
              </Link>
            ) : pathname === '/register' ? (
              <Link href="/login" className="hover:underline">
                Entrar
              </Link>
            ) : (
              <Link href="/login" className="hover:underline">
                Entrar
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {isOpen && (
        <nav className="absolute top-30 left-1/2 transform -translate-x-1/2 w-full bg-[#007BFF] shadow-l border-b-10 border-[#1a89ff] z-50">
          <ul className="flex flex-col items-center space-y-4 py-8 text-xl">
            <li>
              <Link href="/landing-page">Início</Link>
            </li>
            <li>
              <Link href="/forum-page">Fórum</Link>
            </li>
            <li>
              <Link href="/notices-page">Notícias</Link>
            </li>
            <li>
              <Link href="/complaints">Denúncias</Link>
            </li>
            {/* <li>
              <Link href="#">Conversas</Link>
            </li> */}
            {pathname === '/login' ? (
              <Link href="/register" className="hover:underline">
                Cadastrar-se
              </Link>
            ) : pathname === '/register' ? (
              <Link href="/login" className="hover:underline">
                Entrar
              </Link>
            ) : (
              <Link href="/login" className="hover:underline">
                Entrar
              </Link>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
