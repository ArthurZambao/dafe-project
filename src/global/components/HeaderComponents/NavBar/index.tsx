'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavItem } from '../NavItem';
import { UserMenu } from '../UserMenu';
import { useAuth } from '@/global/context/useAuth';
import { NavBarMobile } from '../NavBarMobile';
import { AnimatedButton } from '@/global/animations/animatedButton';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const closeUserMenu = () => setIsUserMenuOpen(false);

  const renderAuthLink = () => {
    if (isAuthenticated) {
      return (
        <>
          <AnimatedButton onClick={toggleUserMenu}>
            Perfil
          </AnimatedButton>
          {isUserMenuOpen && <UserMenu toggleUserMenu={toggleUserMenu} />}
        </>
      );
    }

    if (pathname === '/login') {
      return <NavItem href="/register" pathname={pathname}>Cadastrar-se</NavItem>;
    }
    console.log(isAuthenticated)
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
          <NavItem href="/landing-page" pathname={pathname} onClick={closeUserMenu}>Início</NavItem>
          <NavItem href="/forms-page" pathname={pathname} onClick={closeUserMenu}>
            <span className="hidden md:inline-block lg:hidden">Form.</span>
            <span className="inline-block md:hidden lg:inline-block">Formulário</span>
          </NavItem>
          <NavItem href="/forum-page" pathname={pathname} onClick={closeUserMenu}>Fórum</NavItem>
          <NavItem href="/notices-page" pathname={pathname} onClick={closeUserMenu}>Notícias</NavItem>
          <NavItem href="/complaints" pathname={pathname} onClick={closeUserMenu}>Denúncias</NavItem>
          <li>
            {renderAuthLink()}
          </li>
        </ul>
      </nav>

      {isOpen && (
        <NavBarMobile pathname={pathname} toggleMenu={toggleMenu} renderAuthLink={renderAuthLink} />
      )}
    </div>
  );
}
