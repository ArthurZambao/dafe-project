import { JSX } from 'react';
export interface NavBarMobileProps {
  pathname: string;
  toggleMenu: () => void;
  renderAuthLink: () => JSX.Element;
}