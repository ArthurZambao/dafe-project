import { ReactNode } from "react";

export interface NavItemProps {
    href: string;
    pathname: string;
    onClick?: () => void;
    children: ReactNode;
    isMobile?: boolean;
}