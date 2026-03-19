
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: '/api/', // Nginx proxy to backend container
  // BASE_URL: 'http://localhost:8081/', // Development only
  ENDPOINTS: {
    OST22: `ost22`,
    ESDP: `esdp`,
    THREADS: `threads`,
    CHAMFERS: `chamfers`,
  }
};