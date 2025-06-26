import { ReactNode } from "react";

export interface AuthGateProps {
  children: ReactNode;
  mode: 'auth' | 'guest';
  redirectTo?: string;
}