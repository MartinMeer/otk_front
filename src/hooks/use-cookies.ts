import { useState, useEffect, useCallback } from 'react';
import { setCookie, getCookie, deleteCookie, areCookiesEnabled } from '../utils/cookies';

export interface UseCookiesOptions {
  enabled?: boolean;
  onError?: (error: Error) => void;
}

export const useCookies = (options: UseCookiesOptions = {}) => {
  const { enabled = true, onError } = options;
  const [isSupported, setIsSupported] = useState<boolean>(false);

  // Check cookie support on mount
  useEffect(() => {
    if (enabled) {
      setIsSupported(areCookiesEnabled());
    }
  }, [enabled]);

  const setCookieValue = useCallback((
    name: string, 
    value: string, 
    cookieOptions?: Parameters<typeof setCookie>[2]
  ) => {
    if (!enabled || !isSupported) {
      onError?.(new Error('Cookies are not supported or disabled'));
      return false;
    }

    try {
      setCookie(name, value, cookieOptions);
      return true;
    } catch (error) {
      onError?.(error as Error);
      return false;
    }
  }, [enabled, isSupported, onError]);

  const getCookieValue = useCallback((name: string): string | null => {
    if (!enabled || !isSupported) {
      return null;
    }

    try {
      return getCookie(name);
    } catch (error) {
      onError?.(error as Error);
      return null;
    }
  }, [enabled, isSupported, onError]);

  const removeCookie = useCallback((name: string, path?: string): boolean => {
    if (!enabled || !isSupported) {
      return false;
    }

    try {
      // Ensure deletion matches default set path
      deleteCookie(name, { path: path ?? '/' });
      return true;
    } catch (error) {
      onError?.(error as Error);
      return false;
    }
  }, [enabled, isSupported, onError]);

  return {
    isSupported,
    setCookie: setCookieValue,
    getCookie: getCookieValue,
    removeCookie,
    areCookiesEnabled: () => isSupported
  };
}; 