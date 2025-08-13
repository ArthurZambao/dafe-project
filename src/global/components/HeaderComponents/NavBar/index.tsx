'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavItem } from '../NavItem';
import { UserMenu } from '../UserMenu';
import { useAuth } from '@/global/context/useAuth';
import { NavBarMobile } from '../NavBarMobile';
import { AnimatedButton } from '@/global/animations/animatedButton';
import Image from 'next/image';
import Link from 'next/link';

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
          <AnimatedButton onClick={toggleUserMenu}>Perfil</AnimatedButton>
          {isUserMenuOpen && <UserMenu toggleUserMenu={toggleUserMenu} />}
        </>
      );
    }

    if (pathname === '/login') {
      return (
        <NavItem href="/register" pathname={pathname}>
          Cadastrar-se
        </NavItem>
      );
    }
    return (
      <NavItem href="/login" pathname={pathname}>
        Entrar
      </NavItem>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white text-azure-primary border-b-2 border-azure-primary flex justify-between items-center h-26 px-6 select-none">
      <Link href="/" className=" -ml-6 sm:-ml-10 flex items-center h-full pt-4 sm:pt-0">
        <Image
          src="/icons/dafe-logo.svg"
          alt="Logo do DAFE"
          width={180}
          height={100}
          className="h-[130%] max-h-[130%] sm:h-[170%] sm:max-h-[170%] w-auto pt-0 sm:pt-4"
          priority
        />
        <h1 className="-ml-4 sm:-ml-6 text-lg md:text-2xl lg:text-3xl font-semibold text-[#034ab9]">D.A.F.E</h1>
      </Link>

      <button className="block md:hidden ml-auto text-3xl" type="button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav>
        <ul className="hidden md:flex items-center  md:text-base lg:text-xl">
          <NavItem href="/landing-page" pathname={pathname} onClick={closeUserMenu}>
            Início
          </NavItem>
          <NavItem href="/forms-page" pathname={pathname} onClick={closeUserMenu}>
            <span className="hidden md:inline-block lg:hidden">Form.</span>
            <span className="inline-block md:hidden lg:inline-block">Formulário</span>
          </NavItem>
          <NavItem href="/forum-page" pathname={pathname} onClick={closeUserMenu}>
            Fórum
          </NavItem>
          <NavItem href="/notices-page" pathname={pathname} onClick={closeUserMenu}>
            Notícias
          </NavItem>
          <NavItem href="/complaints" pathname={pathname} onClick={closeUserMenu}>
            Denúncias
          </NavItem>
          <li className='pl-2'>{renderAuthLink()}</li>
        </ul>
      </nav>

      {isOpen && (
        <NavBarMobile pathname={pathname} toggleMenu={toggleMenu} renderAuthLink={renderAuthLink} />
      )}
    </div>
  );
}
