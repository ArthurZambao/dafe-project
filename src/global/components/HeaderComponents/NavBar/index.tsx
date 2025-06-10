'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getValidToken } from '@/global/utils/auth';
import { NavItem } from '../NavItem';


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
      return <NavItem href="/users" pathname={pathname}>Perfil</NavItem>;
    }

    if (pathname === '/login') {
      return <NavItem href="/register" pathname={pathname}>Cadastrar-se</NavItem>;
    } 

    if (pathname === '/register') {
      <NavItem href="/login" pathname={pathname}>Entrar</NavItem>;
    }

    return <NavItem href="/login" pathname={pathname}>Entrar</NavItem>;
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white text-azure-primary border-b-2 border-azure-primary flex justify-between p-6 items-center select-none">
      <h1 className="text-3xl font-bold text-azure-primary flex items-center space-x-2">LOGO</h1>

      <button className="block md:hidden ml-auto text-3xl" type="button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav>
        <ul className="hidden md:flex items-center space-x-2 lg:space-x-4 text-xl">
          <NavItem href="/landing-page" pathname={pathname}>Início</NavItem>
          <NavItem href="/forms-page" pathname={pathname}>
            <span className="hidden md:inline-block lg:hidden">Form.</span>
            <span className="inline-block md:hidden lg:inline-block">Formulário</span>
          </NavItem>
          <NavItem href="/forum-page" pathname={pathname}>Fórum</NavItem>
          <NavItem href="/notices-page" pathname={pathname}>Notícias</NavItem>
          <NavItem href="/complaints" pathname={pathname}>Denúncias</NavItem>
          <li className="py-2 px-4 rounded-xl">{renderAuthLink()}</li>
        </ul>
      </nav>

      {isOpen && (
        <nav className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-l border-b-2 z-50">
          <ul className="flex flex-col items-center space-y-4 py-8 text-xl">
            <NavItem href="/landing-page" pathname={pathname} onClick={toggleMenu}>Início</NavItem>
            <NavItem href="/forms-page" pathname={pathname} onClick={toggleMenu}>Formulários</NavItem>
            <NavItem href="/forum-page" pathname={pathname} onClick={toggleMenu}>Fórum</NavItem>
            <NavItem href="/notices-page" pathname={pathname} onClick={toggleMenu}>Notícias</NavItem>
            <NavItem href="/complaints" pathname={pathname} onClick={toggleMenu}>Denúncias</NavItem>
            <li onClick={toggleMenu}>{renderAuthLink()}</li>
          </ul>
        </nav>
      )}
    </div>
  );
}
