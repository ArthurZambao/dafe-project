'use client';

import { AnimatedButton } from '@/global/animations/animatedButton';
import { AnimatedLink } from '@/global/animations/animatedLink';
import { useAuth } from '@/global/context/useAuth';

interface UserMenuProps {
  toggleUserMenu: () => void;
  toggleMenu: () => void;
}

export function UserMenu({ toggleUserMenu, toggleMenu }: UserMenuProps) {
  const toggleMenus = () => {
    toggleUserMenu();
    toggleMenu();
  };
  
  const { logout } = useAuth();
  return (
    <div className="absolute right-0 mt-2 mr-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <ul className="flex flex-col">
        <li className="px-4 py-2" onClick={toggleMenus}>
          <AnimatedLink href="/users">Página do Perfil</AnimatedLink>
        </li>
        <li className="px-4 py-2" onClick={toggleMenus}>
          <AnimatedLink href="/users/edit-user">Editar Perfil</AnimatedLink>
        </li>
        <li className="px-4 py-2" onClick={logout}>
          <AnimatedButton>Logout</AnimatedButton>
        </li>
      </ul>
    </div>
  );
}
