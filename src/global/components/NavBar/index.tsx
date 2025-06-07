'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getValidToken } from '@/global/utils/auth';
import { AnimatedLink } from '@/global/animations/animatedLink';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const token = getValidToken();
    setIsAuthenticated(!!token);
  }, [pathname]);

  const renderAuthLink = () => {
    if (isAuthenticated || pathname === '/users') {
      return <Link href="/users">Perfil</Link>;
    }

    if (pathname === '/login') {
      return <Link href="/register">Cadastrar-se</Link>;
    }

    if (pathname === '/register') {
      return <Link href="/login">Entrar</Link>;
    }

    return <Link href="/login">Entrar</Link>;
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white text-azure-primary border-b-1 border-[#0E2641] flex justify-between p-6 items-center select-none">
      <h1 className="text-3xl font-bold text-azure-primary flex items-center space-x-2">LOGO</h1>

      <button className="block md:hidden ml-auto text-3xl" type="button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav>
        <ul className="hidden md:flex items-center space-x-2 lg:space-x-4 text-xl">
          <li className="py-2 px-4 rounded-xl">
            <AnimatedLink href="/landing-page">Início</AnimatedLink>
          </li>
          <li className="py-2 px-4 rounded-xl ">
            <AnimatedLink href="/forms-page">
              <span className="hidden md:inline-block lg:hidden">Form.</span>
              <span className="inline-block md:hidden lg:inline-block">Formulário</span>
            </AnimatedLink>
          </li>
          <li className="py-2 px-4 rounded-xl ">
            <AnimatedLink href="/forum-page">Fórum</AnimatedLink>
          </li>
          <li className="py-2 px-4 rounded-xl">
            <AnimatedLink href="/notices-page">Notícias</AnimatedLink>
          </li>
          <li className="py-2 px-4 rounded-xl ">
            <AnimatedLink href="/complaints">Denúncias</AnimatedLink>
          </li>
          <li className="py-2 px-4 rounded-xl">{renderAuthLink()}</li>
        </ul>
      </nav>

      {isOpen && (
        <nav className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-l border-b-2 z-50">
          <ul className="flex flex-col items-center space-y-4 py-8 text-xl">
            <li>
              <Link href="/landing-page" onClick={toggleMenu}>
                Início
              </Link>
            </li>
            <li>
              <Link href="/forms-page" onClick={toggleMenu}>
                Formulários
              </Link>
            </li>
            <li>
              <Link href="/forum-page" onClick={toggleMenu}>
                Fórum
              </Link>
            </li>
            <li>
              <Link href="/notices-page" onClick={toggleMenu}>
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/complaints" onClick={toggleMenu}>
                Denúncias
              </Link>
            </li>
            <li>{renderAuthLink()}</li>
          </ul>
        </nav>
      )}
    </div>
  );
}
