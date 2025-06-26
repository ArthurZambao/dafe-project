'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { JwtPayload } from '@/types/jwt';
import { AuthContextProps } from '@/types/authContext';

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  logout: () => {},
  setUserFromToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;

        if (!decoded.exp || decoded.exp > now) {
          setUser(decoded);
        } else {
          Cookies.remove('token');
        }
      } catch {
        Cookies.remove('token');
      }
    }
  }, []);

  function logout() {
    Cookies.remove('token');
    setUser(null);
    window.location.href = '/login';
  }

  function setUserFromToken(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logout,
        setUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
