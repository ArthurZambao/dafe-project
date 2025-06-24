import { useAuth } from "@/global/context/useAuth";
import { JwtPayload } from "jwt-decode";

export function useCurrentUser(): JwtPayload {
  const { user } = useAuth();
  if (!user) {
    throw new Error('Usuário não autenticado!');
  }
  return user;
}
