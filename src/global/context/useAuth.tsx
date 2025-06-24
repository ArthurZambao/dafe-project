'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { JwtPayload } from '@/types/jwt';
import api, { injectSetUserFromToken } from '../utils/axiosInstance';
import { AuthContextProps } from '@/types/authContext';
import axios from 'axios'; // Importar axios aqui para a chamada de refresh

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  isAuthReady: false,
  logout: () => {},
  setUserFromToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('token');
      const refreshToken = localStorage.getItem('refreshToken');
      let isAuthenticatedWithToken = false;

      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const now = Date.now() / 1000;

          if (!decoded.exp || decoded.exp > now) {
            // Token JWT válido e não expirado
            setUser(decoded);
            isAuthenticatedWithToken = true;
          } else {
            // Token JWT expirado
            Cookies.remove('token');
            console.log("Access token expirado na inicialização.");
          }
        } catch (error) {
          // Erro ao decodificar ou token inválido
          console.error("Erro ao decodificar access token na inicialização:", error);
          Cookies.remove('token');
        }
      }


      if (!isAuthenticatedWithToken && refreshToken) {
        console.log("Tentando refresh token na inicialização...");
        try {
          const response = await axios.post('http://localhost:3030/login-jwt/refresh', {
            refreshToken,
          });

          const { token: newToken, refreshToken: newRefreshToken } = response.data;

          Cookies.set('token', newToken, { expires: 7 }); 
          localStorage.setItem('refreshToken', newRefreshToken);

          const decodedNewToken = jwtDecode<JwtPayload>(newToken);
          setUser(decodedNewToken);
          isAuthenticatedWithToken = true; 

          console.log("Refresh token bem-sucedido na inicialização.");

        } catch (error) {
          console.error("Falha ao usar refresh token na inicialização:", error);
          Cookies.remove('token');
          localStorage.removeItem('refreshToken');
          setUser(null);

        }
      }
      
      injectSetUserFromToken(setUserFromToken);
      setIsAuthReady(true);
    };

    initializeAuth();
  }, []); 

    function logout() {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            api
                .post('/login-jwt/logout', { refreshToken })
                .catch(() => {
                    console.warn('Erro ao revogar refresh token no backend.');
                });
        }

        Cookies.remove('token');
        localStorage.removeItem('refreshToken');
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
                isAuthReady,
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