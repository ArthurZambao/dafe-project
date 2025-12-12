import { AnimatedLink } from '@/global/animations/animatedLink';
import { NavItemProps } from '@/types/navBar';

export function NavItem({ href, pathname, children, onClick, toggleUserMenu }: NavItemProps) {
  const isActive = pathname.startsWith(href);

  const baseClass = 'py-2 px-4 rounded-xl transition-colors duration-300';
  const activeClass = 'bg-azure-primary text-white';

  return (
    <div
      className={`${baseClass} ${isActive ? activeClass : ''}`}
      onClick={() => toggleUserMenu?.()}
    >
      <AnimatedLink href={href}>
        <div onClick={onClick}>{children}</div>
      </AnimatedLink>
    </div>
  );
}
