import { api } from '@/libs/api/axios';
import axios from 'axios';
import Cookies from 'js-cookie';

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedQueueItem[] = [];

let setUserFromToken: ((token: string) => void) | null = null;

export function injectSetUserFromToken(fn: (token: string) => void) {
  setUserFromToken = fn;
}


const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};


// Intercepta requisições para adicionar token
api.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Intercepta respostas para tratar erro 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refreshToken')
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('http://localhost:3030/login-jwt/refresh', {
            refreshToken,
          });

          const { token, refreshToken: newRefreshToken } = response.data;

          Cookies.set('token', token, { expires: 7 });
          localStorage.setItem('refreshToken', newRefreshToken);

          if (setUserFromToken) {
            setUserFromToken(token);
          }

          processQueue(null, token);
        } catch (err) {
          processQueue(err, null);
          localStorage.removeItem('refreshToken');
          Cookies.remove('token');
          window.location.href = '/login';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string | null) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              reject(new Error('No token available'));
            }
          },
          reject: (err: unknown) => reject(err),
        });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
