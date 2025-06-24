import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/jwt';
import axios from 'axios';

export async function getValidToken(): Promise<string | null> {
  const token = Cookies.get('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token && !refreshToken) {
    return null;
  }

  try {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp > now) {
        return token;
      } else {

        console.log("Access token expirado em getValidToken. Removendo e tentando refresh...");
        Cookies.remove('token');
      }
    }

    if (refreshToken) {
      console.log("Tentando usar refresh token em getValidToken...");
      const response = await axios.post('http://localhost:3030/login-jwt/refresh', { refreshToken });

      const { token: newToken, refreshToken: newRefreshToken } = response.data;


      Cookies.set('token', newToken, { expires: 7, sameSite: 'lax' });
      localStorage.setItem('refreshToken', newRefreshToken);

      console.log("Refresh token bem-sucedido em getValidToken. Novo token obtido.");
      return newToken;
    }

    return null;

  } catch (error) {
    console.error("Erro no getValidToken:", error);
    Cookies.remove('token');
    localStorage.removeItem('refreshToken');
    return null;
  }
}