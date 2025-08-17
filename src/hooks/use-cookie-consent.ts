import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCookies } from './use-cookies';
import { getCookie as getRawCookie } from '../utils/cookies';
import { COOKIE_DEFAULTS, COOKIE_NAMES, CONSENT_VALUES } from '../config/cookieConfig';

export interface CookieConsentState {
  hasConsented: boolean;
  consentType: 'accepted' | 'declined' | 'custom' | null;
  analytics: boolean;
  functional: boolean;
  necessary: boolean; // Always true
}

export const useCookieConsent = () => {
  const { setCookie } = useCookies();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [consentState, setConsentState] = useState<CookieConsentState>({
    hasConsented: false,
    consentType: null,
    analytics: false,
    functional: false,
    necessary: true
  });

  // Load consent state from cookies
  useEffect(() => {
    const consent = getRawCookie(COOKIE_NAMES.CONSENT);
    const analytics = getRawCookie(COOKIE_NAMES.ANALYTICS_CONSENT) === 'true';
    const functional = getRawCookie(COOKIE_NAMES.FUNCTIONAL_CONSENT) === 'true';

    // Set both state and loaded flag in the same effect to avoid timing issues
    setConsentState({
      hasConsented: !!consent,
      consentType: (consent as 'accepted' | 'declined' | 'custom') || null,
      analytics,
      functional,
      necessary: true
    });
    
    setIsLoaded(true);
  }, []); // Empty dependency array - only run once on mount

  // Refresh function for external use
  const loadConsentState = useCallback(() => {
    const consent = getRawCookie(COOKIE_NAMES.CONSENT);
    const analytics = getRawCookie(COOKIE_NAMES.ANALYTICS_CONSENT) === 'true';
    const functional = getRawCookie(COOKIE_NAMES.FUNCTIONAL_CONSENT) === 'true';

    setConsentState({
      hasConsented: !!consent,
      consentType: (consent as 'accepted' | 'declined' | 'custom') || null,
      analytics,
      functional,
      necessary: true
    });
  }, []); // No dependencies needed for raw cookie access

  const showBanner = useMemo(() => {
    return isLoaded && !consentState.consentType;
  }, [isLoaded, consentState.consentType]);
  const isAnalyticsAllowed = useMemo(() => consentState.analytics, [consentState.analytics]);
  const isFunctionalAllowed = useMemo(() => consentState.functional, [consentState.functional]);

  const acceptAll = () => {
    setCookie(COOKIE_NAMES.CONSENT, CONSENT_VALUES.ACCEPTED, COOKIE_DEFAULTS);
    setCookie(COOKIE_NAMES.ANALYTICS_CONSENT, 'true', COOKIE_DEFAULTS);
    setCookie(COOKIE_NAMES.FUNCTIONAL_CONSENT, 'true', COOKIE_DEFAULTS);

    setConsentState({
      hasConsented: true,
      consentType: 'accepted',
      analytics: true,
      functional: true,
      necessary: true
    });
  };

  const declineAll = () => {
    setCookie(COOKIE_NAMES.CONSENT, CONSENT_VALUES.DECLINED, COOKIE_DEFAULTS);
    setCookie(COOKIE_NAMES.ANALYTICS_CONSENT, 'false', COOKIE_DEFAULTS);
    setCookie(COOKIE_NAMES.FUNCTIONAL_CONSENT, 'false', COOKIE_DEFAULTS);

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
    
    setCookie(COOKIE_NAMES.CONSENT, CONSENT_VALUES.CUSTOM, COOKIE_DEFAULTS);
    setCookie(COOKIE_NAMES.ANALYTICS_CONSENT, newState.analytics ? 'true' : 'false', COOKIE_DEFAULTS);
    setCookie(COOKIE_NAMES.FUNCTIONAL_CONSENT, newState.functional ? 'true' : 'false', COOKIE_DEFAULTS);

    setConsentState(newState);
  };



  return {
    consentState,
    isLoaded,
    showBanner,
    isAnalyticsAllowed,
    isFunctionalAllowed,
    acceptAll,
    declineAll,
    updateSettings,
    refreshConsent: loadConsentState
  };
}; 