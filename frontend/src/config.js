// Configuration for backend URL and API base
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ambualert-1.onrender.com';

// API base URL helper:
// In development, if VITE_BACKEND_URL is not set, we can fall back to relative '/api' 
// to take advantage of the Vite proxy. In production (e.g. Vercel), we direct calls 
// directly to the deployed Render backend URL.
export const API_BASE = import.meta.env.VITE_BACKEND_URL 
  ? `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/api`
  : (import.meta.env.DEV ? '/api' : 'https://ambualert-1.onrender.com/api');
