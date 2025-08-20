/**
 * Type definitions for the QTC Controller Assistant application
 */

export interface User {
  id: string;
  username: string;
  role: 'controller' | 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginDemo: () => void;
}

export interface Ost22Response {
  upper_deviance: string;
  lower_deviance: string;
  max_mes_value: string;
  min_mes_value: string;
}

export interface EsdpResponse {
  upper_deviance: string;
  lower_deviance: string;
  max_mes_value: string;
  min_mes_value: string;
}

export interface ThreadsResponse {
  middleDiameter: {
    value: string;
    upper_deviance: string;
    lower_deviance: string;
    maxValue: string;
    minValue: string;
  };
  nominalDiameter: {
    value: string;
    upper_deviance: string;
    lower_deviance: string;
    maxValue: string;
    minValue: string;
  };
}

export interface ChamfersResult {
  hypotenuse: string;
  sideA?: string;
  sideB?: string;
  angle?: string;
}

declare global {
  const __DEV__: boolean;
}
export {};