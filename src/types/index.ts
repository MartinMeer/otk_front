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

export interface CalculatorResult {
  upperDeviation: number;
  lowerDeviation: number;
  maxSize: number;
  minSize: number;
}

export interface ThreadCalculatorResult {
  middleDiameter: {
    value: number;
    upperDeviation: number;
    lowerDeviation: number;
    maxValue: number;
    minValue: number;
  };
  nominalDiameter: {
    value: number;
    upperDeviation: number;
    lowerDeviation: number;
    maxValue: number;
    minValue: number;
  };
}

export interface ChamferResult {
  hypotenuse: number;
  sideA?: number;
  sideB?: number;
  angle?: number;
}