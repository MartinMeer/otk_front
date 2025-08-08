import { useState, useEffect } from 'react';
import { useCookies } from './use-cookies';

export interface CookieConsentState {
  hasConsented: boolean;
  consentType: 'accepted' | 'declined' | 'custom' | null;
  analytics: boolean;
  functional: boolean;
  necessary: boolean; // Always true
}

export const useCookieConsent = () => {
  const { getCookie, setCookie } = useCookies();
  const [consentState, setConsentState] = useState<CookieConsentState>({
    hasConsented: false,
    consentType: null,
    analytics: false,
    functional: false,
    necessary: true
  });

  useEffect(() => {
    // Load consent state from cookies
    const consent = getCookie('cookie_consent');
    const analytics = getCookie('analytics_consent') === 'true';
    const functional = getCookie('functional_consent') === 'true';

    setConsentState({
      hasConsented: !!consent,
      consentType: consent as any || null,
      analytics,
      functional,
      necessary: true
    });
  }, [getCookie]);

  const acceptAll = () => {
    setCookie('cookie_consent', 'accepted', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    setCookie('analytics_consent', 'true', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    setCookie('functional_consent', 'true', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });

    setConsentState({
      hasConsented: true,
      consentType: 'accepted',
      analytics: true,
      functional: true,
      necessary: true
    });
  };

  const declineAll = () => {
    setCookie('cookie_consent', 'declined', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    setCookie('analytics_consent', 'false', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    setCookie('functional_consent', 'false', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });

    setConsentState({
      hasConsented: true,
      consentType: 'declined',
      analytics: false,
      functional: false,
      necessary: true
    });
  };

  const updateSettings = (settings: Partial<CookieConsentState>) => {
    const newState = { ...consentState, ...settings };
    
    setCookie('cookie_consent', 'custom', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    setCookie('analytics_consent', newState.analytics ? 'true' : 'false', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    setCookie('functional_consent', newState.functional ? 'true' : 'false', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });

    setConsentState(newState);
  };

  return {
    consentState,
    acceptAll,
    declineAll,
    updateSettings
  };
}; 