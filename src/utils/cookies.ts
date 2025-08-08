/**
 * Simple frontend-only cookie utilities
 */

export const setCookie = (name: string, value: string, options: any = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }
  
  if (options.path) {
    cookieString += `; path=${options.path}`;
  } else {
    cookieString += '; path=/';
  }
  
  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  
  return null;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', { maxAge: 0 });
};

/**
 * Check if cookies are enabled in the browser
 */
export const areCookiesEnabled = (): boolean => {
  try {
    setCookie('test', 'test');
    const enabled = getCookie('test') === 'test';
    deleteCookie('test');
    return enabled;
  } catch {
    return false;
  }
};

/**
 * Get all cookies as an object
 */
export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  
  if (document.cookie) {
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });
  }
  
  return cookies;
}; 