// src/services/apiService.ts
import { API_CONFIG } from '../../config/api';
import { Ost22Response, EsdpResponse } from '../types/index'

export interface EsdpRequest {
  elementType: string;
  size: number;
  fundamental: string;
  grade: string;
}

export interface Ost22Request {
  //pageId: string; now request sends to dedicated api for each page
  inputString: string;
}

export interface ApiResponse {
  upper_deviance?: string;
  lower_deviance?: string;
  min_mes_value?: string;
  max_mes_value?: string;
  pitch_diameter?: string;
  es_d2?: string;
  ei_d2?: string;
  max_mes_value_d2?: string;
  min_mes_value_d2?: string;
  nom_diameter?: string;
  es_d?: string;
  ei_d?: string;
  max_mes_value_d?: string;
  min_mes_value_d?: string;
  deviation_values?: string;
  hypotenuse?: string;
}


export class ApiService {
  static async postData<T, R>(endpoint: string, data: R): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Server error');
    }

    return response.json() as Promise<T>;
  }

  static async processOst22(data: Ost22Request): Promise<Ost22Response> {
    return this.postData<Ost22Response, Ost22Request>(API_CONFIG.ENDPOINTS.OST22, data);
  }
  static async processEsdp(data: EsdpRequest): Promise<EsdpResponse> {
    return this.postData<EsdpResponse, EsdpRequest>(API_CONFIG.ENDPOINTS.ESDP, data);
  }
}