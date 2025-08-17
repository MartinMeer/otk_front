/**
 * Centralized cookie configuration to avoid duplication
 * across the application
 */

import type { CookieOptions } from '../utils/cookies';

// Standard cookie configuration used throughout the app
export const COOKIE_DEFAULTS: CookieOptions = {
  maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
  path: '/',
  sameSite: 'Lax'
} as const;

// Cookie names used in the application
export const COOKIE_NAMES = {
  CONSENT: 'cookie_consent',
  ANALYTICS_CONSENT: 'analytics_consent',
  FUNCTIONAL_CONSENT: 'functional_consent'
} as const;

// Cookie values for consent types
export const CONSENT_VALUES = {
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  CUSTOM: 'custom'
} as const;

// Utility function to create cookie options with defaults
export const createCookieOptions = (overrides?: Partial<CookieOptions>): CookieOptions => ({
  ...COOKIE_DEFAULTS,
  ...overrides
});
