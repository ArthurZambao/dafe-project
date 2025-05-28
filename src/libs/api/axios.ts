import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localgost:3030', //url do Backend 
  withCredentials: true,
});
