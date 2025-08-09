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

export interface Ost22Request{
  elementType: string;
  size: number;
}

export interface Ost22Responce {
  upper_deviance: string;
  lower_deviance: string;
  max_mes_value: string;
  min_mes_value: string;
}

export interface EsdpResponce {
  upper_deviance: string;
  lower_deviance: string;
  max_mes_value: string;
  min_mes_value: string;
}

export interface ThreadsResponce {
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