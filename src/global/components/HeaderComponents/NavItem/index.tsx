'use client';

import { AnimatedLink } from '@/global/animations/animatedLink';
import { NavItemProps } from '@/types/navBar';

export function NavItem({ href, pathname, children, onClick, isMobile = false }: NavItemProps) {
    const isActive = pathname === href;

    const baseClass =
        'py-2 px-4 rounded-xl transition-colors duration-300';
    const activeClass = 'bg-azure-primary text-white';

    return (
        <li className={`${baseClass} ${isActive ? activeClass : ''}`}>
            <AnimatedLink href={href} >
                <div onClick={onClick}>
                    {children}
                </div>
            </AnimatedLink>
        </li>
    );
}
