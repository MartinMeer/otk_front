import { API_CONFIG } from '../../../config/api';

export interface ApiRequest {
  pageId: string;
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
  static async postData(endpoint: string, data: ApiRequest): Promise<ApiResponse> {
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

    return response.json();
  }

  static async processCalculation(pageId: string, inputString: string): Promise<ApiResponse> {
    return this.postData(API_CONFIG.ENDPOINTS.PROCESS, { pageId, inputString });
  }
}