/**
 * Simple frontend-only cookie utilities
 */

export type SameSiteOption = 'Lax' | 'Strict' | 'None';

export interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: SameSiteOption;
  /**
   * Expiration date. If number is provided, it is treated as a timestamp (ms)
   */
  expires?: Date | string | number;
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (typeof options.maxAge === 'number') {
    cookieString += `; Max-Age=${Math.floor(options.maxAge)}`;
  }

  if (options.expires !== undefined) {
    const expires = options.expires instanceof Date
      ? options.expires
      : typeof options.expires === 'number'
        ? new Date(options.expires)
        : new Date(options.expires);
    cookieString += `; Expires=${expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; Path=${options.path}`;
  } else {
    cookieString += '; Path=/';
  }

  if (options.domain) {
    cookieString += `; Domain=${options.domain}`;
  }

  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  if (options.secure) {
    cookieString += '; Secure';
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

export const deleteCookie = (
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {}
) => {
  // Ensure deletion matches the path/domain where it was set
  setCookie(name, '', {
    maxAge: 0,
    expires: new Date(0),
    path: options.path ?? '/',
    domain: options.domain,
  });
};

/**
 * Check if cookies are enabled in the browser
 */
export const areCookiesEnabled = (): boolean => {
  if (typeof navigator !== 'undefined' && typeof navigator.cookieEnabled === 'boolean') {
    return navigator.cookieEnabled;
  }
  // Fallback for very old browsers: attempt set/delete (rarely executed)
  try {
    const testName = 'cookie_test__enabled';
    setCookie(testName, '1', { path: '/' });
    const enabled = getCookie(testName) === '1';
    deleteCookie(testName, { path: '/' });
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
    document.cookie.split(';').forEach(entry => {
      const trimmed = entry.trim();
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const name = trimmed.substring(0, eqIndex);
        const value = trimmed.substring(eqIndex + 1);
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });
  }

  return cookies;
};