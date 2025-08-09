// src/services/apiService.ts
import { API_CONFIG } from '../../config/api';
import { Ost22Responce, EsdpResponce } from '../types/index'

export interface ApiRequest {
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
  static async postData<T>(endpoint: string, data: ApiRequest): Promise<T> {
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

  static async processOst22(inputString: string): Promise<Ost22Responce> {
    return this.postData<Ost22Responce>(API_CONFIG.ENDPOINTS.OST22, { inputString }) as Promise<Ost22Responce>;
  }
  static async processEsdp(inputString: string): Promise<EsdpResponce> {
    return this.postData<EsdpResponce>(API_CONFIG.ENDPOINTS.ESDP, { inputString }) as Promise<EsdpResponce>;
  }
}