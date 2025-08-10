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

export interface Ost22Responce {
  upperDeviation: string;
  lowerDeviation: string;
  maxMesSize: string;
  minMesSize: string;
}

export interface EsdpResponce {
  upperDeviation: string;
  lowerDeviation: string;
  maxSize: string;
  minSize: string;
}

export interface ThreadsResponce {
  middleDiameter: {
    value: string;
    upperDeviation: string;
    lowerDeviation: string;
    maxValue: string;
    minValue: string;
  };
  nominalDiameter: {
    value: string;
    upperDeviation: string;
    lowerDeviation: string;
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