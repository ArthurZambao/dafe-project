'use client';

import { AnimatedButton } from '@/global/animations/animatedButton';
import { AnimatedLink } from '@/global/animations/animatedLink';
import { useAuth } from '@/global/context/useAuth';

interface UserMenuProps {
  toggleUserMenu: () => void;
  closeMobileMenu?: () => void;
  inMobile?: boolean;
}

export function UserMenu({ toggleUserMenu, closeMobileMenu, inMobile }: UserMenuProps) {
  const { logout } = useAuth();

  const closeAllMenus = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    toggleUserMenu(); 
    if (inMobile) closeMobileMenu?.();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border-b-3 border-azure-primary">
      <ul className="flex flex-col">
        <li className="px-4 py-2" onClick={closeAllMenus}>
          <AnimatedLink href="/users">Página do Perfil</AnimatedLink>
        </li>

        <li className="px-4 py-2" onClick={closeAllMenus}>
          <AnimatedLink href="/users/edit-user">Editar Perfil</AnimatedLink>
        </li>

        <li
          className="px-4 py-2"
          onClick={() => {
            logout();
            closeAllMenus();
          }}
        >
          <AnimatedButton>Logout</AnimatedButton>
        </li>
      </ul>
    </div>
  );
}
