import { JwtPayload } from "jwt-decode";

export interface AuthContextProps {
  user: JwtPayload | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUserFromToken: (token: string) => void;
}
