import { NavBarMobileProps } from '@/types/navBarMobile';
import { NavItem } from '../NavItem';

export function NavBarMobile({ pathname, toggleMenu, renderAuthLink, user }: NavBarMobileProps) {
  return (
    <nav className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-l border-b-2 z-50">
      <ul className="flex flex-col items-center space-y-4 py-8 text-xl">
        <NavItem href="/landing-page" pathname={pathname} onClick={toggleMenu}>
          Início
        </NavItem>
        <NavItem href="/forms-page" pathname={pathname} onClick={toggleMenu}>
          Formulários
        </NavItem>
        <NavItem href="/forum-page" pathname={pathname} onClick={toggleMenu}>
          Fórum
        </NavItem>
        <NavItem href="/notices-page" pathname={pathname} onClick={toggleMenu}>
          Notícias
        </NavItem>
        {user?.role === 'student' && (
          <NavItem href="/complaints" pathname={pathname} onClick={toggleMenu}>
            Ouvidoria
          </NavItem>
        )}
        <li>{renderAuthLink()}</li>
      </ul>
    </nav>
  );
}
