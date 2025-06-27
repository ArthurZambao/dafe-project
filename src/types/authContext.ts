import { CustomJwtPayload } from "./customJwt";


export interface AuthContextProps {
  user: CustomJwtPayload | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUserFromToken: (token: string) => void;
}
