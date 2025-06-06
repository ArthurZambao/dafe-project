'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getValidToken } from '@/global/utils/auth';

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
      return <Link href="/users" className={`${isActive('/users')}`}>Perfil</Link>;
    }

    if (pathname === '/login') {
      return <Link href="/register" className={`${isActive('/register')}`}>Cadastrar-se</Link>;
    }

    if (pathname === '/register') {
      return <Link href="/login" className={`${isActive('/login')}`}>Entrar</Link>;
    }

    return <Link href="/login" className={`${isActive('/login')}`}>Entrar</Link>;
  };

  const isActive = (path: string) => pathname === path ? 'navbar-mark' : '';

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white text-azure-primary border-b-1 border-[#0E2641] flex justify-between p-6 items-center select-none">
      <h1 className='text-3xl font-bold text-azure-primary flex items-center space-x-2'>
        LOGO
      </h1>

      <button className="block md:hidden ml-auto text-3xl" type="button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav>
        <ul className="hidden md:flex items-center space-x-2 lg:space-x-4 text-xl">
          <li className={`py-2 px-4 rounded-xl navbar-mark-hover ${isActive('/landing-page')}`}>
            <Link href="/landing-page">Início</Link>
          </li>
          <li className={`py-2 px-4 rounded-xl navbar-mark-hover ${isActive('/forms-page')}`}>
            <Link href="/forms-page">
              <span className="hidden md:inline-block lg:hidden">Form.</span>
              <span className="inline-block md:hidden lg:inline-block">Formulário</span>
            </Link>
          </li>
          <li className={`py-2 px-4 rounded-xl navbar-mark-hover ${isActive('/forum-page')}`}>
            <Link href="/forum-page">Fórum</Link>
          </li>
          <li className={`py-2 px-4 rounded-xl navbar-mark-hover ${isActive('/notices-page')}`}>
            <Link href="/notices-page">Notícias</Link>
          </li>
          <li className={`py-2 px-4 rounded-xl navbar-mark-hover ${isActive('/complaints')}`}>
            <Link href="/complaints">Denúncias</Link>
          </li>
          <li className='py-2 px-4 rounded-xl navbar-mark-hover'>{renderAuthLink()}</li>
        </ul>
      </nav>

      {isOpen && (
        <nav className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-l border-b-10 border-azure-secondary z-50">
          <ul className="flex flex-col items-center space-y-4 py-8 text-xl">
            <li className={`${isActive('/landing-page')}`}>
              <Link href="/landing-page" onClick={toggleMenu}>Início</Link>
            </li>
            <li className={`${isActive('/forms-page')}`}>
              <Link href="/forms-page" onClick={toggleMenu}>Formulários</Link>
            </li>
            <li className={`${isActive('/forum-page')}`}>
              <Link href="/forum-page" onClick={toggleMenu}>Fórum</Link>
            </li>
            <li className={`${isActive('/notices-page')}`}>
              <Link href="/notices-page" onClick={toggleMenu}>Notícias</Link>
            </li>
            <li className={`${isActive('/complaints')}`}>
              <Link href="/complaints" onClick={toggleMenu}>Denúncias</Link>
            </li>
            <li>{renderAuthLink()}</li>
          </ul>
        </nav>
      )}
    </div>
  );
}
