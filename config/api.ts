
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: window.location.hostname === 'localhost'
    ? 'http://localhost:9000' // dev proxy
    : 'https://api.otk-help.martinmeer.com',
  ENDPOINTS: {
    OST22: '/ost22',
    ESDP: '/esdp',
    THREADS: '/threads',
    CHAMFERS: '/chamfers',
  }
};