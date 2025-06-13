import {  ReactNode } from "react";

// types/navBar.ts
export interface NavItemProps {
  href: string;
  pathname: string;
  onClick?: () => void;
  children: ReactNode;
  isMobile?: boolean;
  toggleUserMenu?: () => void;
}
