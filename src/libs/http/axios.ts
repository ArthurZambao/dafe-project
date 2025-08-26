import axios from 'axios';
import { getValidToken } from '@/global/utils/auth';

export const api = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getValidToken();

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});
