import { JSX } from 'react';
import { CustomJwtPayload } from './customJwt';
export interface NavBarMobileProps {
  pathname: string;
  toggleMenu: () => void;
  renderAuthLink: () => JSX.Element;
  user: CustomJwtPayload | null;
}