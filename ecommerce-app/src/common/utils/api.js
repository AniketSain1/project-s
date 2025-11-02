import axios from 'axios';
import { CONFIG } from '../constants/config';

export const api = axios.create({
  baseURL: CONFIG.API_BASE,
  timeout: 3000,
});

export default api;
