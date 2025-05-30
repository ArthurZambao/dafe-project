'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatedLink } from '@/global/animations/animatedLink';
import { getValidToken } from '@/global/utils/auth'; // ✅ usando o utilitário

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const token = getValidToken();
    setIsAuthenticated(!!token);
  }, []);

  const renderAuthLink = () => {
    if (isAuthenticated || pathname === '/users') {
      return <AnimatedLink href="/users">Perfil</AnimatedLink>;
    }

    if (pathname === '/login') {
      return <AnimatedLink href="/register">Cadastrar-se</AnimatedLink>;
    }

    if (pathname === '/register') {
      return <AnimatedLink href="/login">Entrar</AnimatedLink>;
    }

    return <AnimatedLink href="/login">Entrar</AnimatedLink>;
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#007BFF] border-b-10 border-[#1a89ff] text-white flex justify-between p-6 items-center select-none">
      <Link href="/landing-page">
        <Image width={220} height={220} src="/icons/dafe-logo.svg" alt="Dafe Logo" />
      </Link>

      <button className="block md:hidden ml-auto text-3xl" type="button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav>
        <ul className="hidden md:flex items-center space-x-4 lg:space-x-10 text-xl">
          <li><AnimatedLink href="/landing-page">Início</AnimatedLink></li>
          <li>
            <AnimatedLink href="/forms-page">
              <span className="hidden md:inline-block lg:hidden">Form.</span>
              <span className="inline-block md:hidden lg:inline-block">Formulário</span>
            </AnimatedLink>
          </li>
          <li><AnimatedLink href="/forum-page">Fórum</AnimatedLink></li>
          <li><AnimatedLink href="/notices-page">Notícias</AnimatedLink></li>
          <li><AnimatedLink href="/complaints">Denúncias</AnimatedLink></li>
          <li>{renderAuthLink()}</li>
        </ul>
      </nav>

      {isOpen && (
        <nav className="absolute top-30 left-1/2 transform -translate-x-1/2 w-full bg-[#007BFF] shadow-l border-b-10 border-[#1a89ff] z-50">
          <ul className="flex flex-col items-center space-y-4 py-8 text-xl">
            <li><Link href="/landing-page" onClick={toggleMenu}>Início</Link></li>
            <li><Link href="/forms-page" onClick={toggleMenu}>Formulários</Link></li>
            <li><Link href="/forum-page" onClick={toggleMenu}>Fórum</Link></li>
            <li><Link href="/notices-page" onClick={toggleMenu}>Notícias</Link></li>
            <li><Link href="/complaints" onClick={toggleMenu}>Denúncias</Link></li>
            <li>{renderAuthLink()}</li>
          </ul>
        </nav>
      )}
    </div>
  );
}
