'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const now = Date.now() / 1000;
        if (decoded.exp > now) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const renderAuthLink = () => {
    if (isAuthenticated) {
      return (
        <Link href="/user-page" className="hover:underline">
          Perfil
        </Link>
      );
    }

    if (pathname === '/login') {
      return (
        <Link href="/register" className="hover:underline">
          Cadastrar-se
        </Link>
      );
    }

    if (pathname === '/register') {
      return (
        <Link href="/login" className="hover:underline">
          Entrar
        </Link>
      );
    }

    return (
      <Link href="/login" className="hover:underline">
        Entrar
      </Link>
    );
  };

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
          <li>{renderAuthLink()}</li>
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
            <li>{renderAuthLink()}</li>
          </ul>
        </nav>
      )}
    </div>
  );
}
