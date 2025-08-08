# Fast Migration Plan: OLD-version to Production-Ready React App

## Phase 1: API Service Layer (1-2 hours)

### Step 1.1: Create API Configuration
```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: 'https://api.otk-help.martinmeer.com',
  ENDPOINTS: {
    PROCESS: '/api/process'
  }
};
```

### Step 1.2: Create API Service
```typescript
// src/services/apiService.ts
import { API_CONFIG } from '../config/api';

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
```

## Phase 2: Update OST22 Calculator (30 minutes)

### Step 2.1: Replace Mock Logic with Real API
```typescript
// src/components/Calculators/OST22Calculator.tsx
import { ApiService } from '../../services/apiService';

// Replace the calculateTolerance function:
const calculateTolerance = async () => {
  if (!size || isNaN(Number(size))) return;
  
  setIsCalculating(true);
  
  try {
    const response = await ApiService.processCalculation('ost22', `${elementType}:${size}`);
    
    const calculationResult: CalculatorResult = {
      upperDeviation: parseFloat(response.upper_deviance || '0'),
      lowerDeviation: parseFloat(response.lower_deviance || '0'),
      maxSize: parseFloat(response.max_mes_value || '0'),
      minSize: parseFloat(response.min_mes_value || '0')
    };

    setResult(calculationResult);
  } catch (error) {
    console.error('Calculation error:', error);
    // Add error handling UI
  } finally {
    setIsCalculating(false);
  }
};
```

## Phase 3: Add Error Handling & Loading States (30 minutes)

### Step 3.1: Create Error Toast Component
```typescript
// src/components/ui/error-toast.tsx
import { toast } from 'sonner';

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 5000,
    position: 'top-center',
  });
};
```

### Step 3.2: Update Calculator with Error Handling
```typescript
// In OST22Calculator.tsx
import { showErrorToast } from '../ui/error-toast';

// In calculateTolerance function:
} catch (error) {
  console.error('Calculation error:', error);
  showErrorToast(error instanceof Error ? error.message : 'Calculation failed');
}
```

## Phase 4: Update Other Calculators (1 hour)

### Step 4.1: Thread Calculator
```typescript
// src/components/Calculators/ThreadCalculator.tsx
const calculateThread = async () => {
  if (!size) return;
  
  setIsCalculating(true);
  
  try {
    const response = await ApiService.processCalculation('thread_m', size);
    
    // Update UI with response data
    setThreadResult({
      middleDiameter: {
        value: parseFloat(response.pitch_diameter || '0'),
        upperDeviation: parseFloat(response.es_d2 || '0'),
        lowerDeviation: parseFloat(response.ei_d2 || '0'),
        maxValue: parseFloat(response.max_mes_value_d2 || '0'),
        minValue: parseFloat(response.min_mes_value_d2 || '0')
      },
      nominalDiameter: {
        value: parseFloat(response.nom_diameter || '0'),
        upperDeviation: parseFloat(response.es_d || '0'),
        lowerDeviation: parseFloat(response.ei_d || '0'),
        maxValue: parseFloat(response.max_mes_value_d || '0'),
        minValue: parseFloat(response.min_mes_value_d || '0')
      }
    });
  } catch (error) {
    showErrorToast(error instanceof Error ? error.message : 'Thread calculation failed');
  } finally {
    setIsCalculating(false);
  }
};
```

### Step 4.2: Facets Calculator
```typescript
// src/components/Calculators/FacetsCalculator.tsx
const calculateFacets = async () => {
  if (!size) return;
  
  setIsCalculating(true);
  
  try {
    const response = await ApiService.processCalculation('facets', size);
    
    setFacetResult({
      hypotenuse: parseFloat(response.hypotenuse || '0')
    });
  } catch (error) {
    showErrorToast(error instanceof Error ? error.message : 'Facet calculation failed');
  } finally {
    setIsCalculating(false);
  }
};
```

### Step 4.3: Classed Size Calculator
```typescript
// src/components/Calculators/ClassedSizeCalculator.tsx
const calculateClassedSize = async () => {
  if (!size) return;
  
  setIsCalculating(true);
  
  try {
    const response = await ApiService.processCalculation('classed-size', size);
    
    setResult({
      upperDeviation: parseFloat(response.upper_deviance || '0'),
      lowerDeviation: parseFloat(response.lower_deviance || '0'),
      maxSize: parseFloat(response.max_mes_value || '0'),
      minSize: parseFloat(response.min_mes_value || '0')
    });
  } catch (error) {
    showErrorToast(error instanceof Error ? error.message : 'Size calculation failed');
  } finally {
    setIsCalculating(false);
  }
};
```

## Phase 5: Testing & Validation (30 minutes)

### Step 5.1: Test API Connectivity
```typescript
// src/utils/apiTest.ts
import { ApiService } from '../services/apiService';

export const testApiConnection = async () => {
  try {
    const response = await ApiService.processCalculation('ost22', 'hole:10');
    console.log('API connection successful:', response);
    return true;
  } catch (error) {
    console.error('API connection failed:', error);
    return false;
  }
};
```

### Step 5.2: Add Connection Status Indicator
```typescript
// In App.tsx or Header component
const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

useEffect(() => {
  testApiConnection().then(success => {
    setApiStatus(success ? 'online' : 'offline');
  });
}, []);
```

## Phase 6: Production Deployment (15 minutes)

### Step 6.1: Build for Production
```bash
npm run build
```

### Step 6.2: Deploy to Production Server
- Upload `dist/` folder to web server
- Configure server to serve `index.html` for all routes
- Test all calculators with real API calls

## Implementation Priority:

1. **Immediate (1 hour)**: API service + OST22 calculator
2. **Next (1 hour)**: Error handling + other calculators  
3. **Final (30 min)**: Testing + deployment

## Files to Create/Modify:

**New Files:**
- `src/config/api.ts`
- `src/services/apiService.ts`
- `src/components/ui/error-toast.tsx`
- `src/utils/apiTest.ts`

**Modified Files:**
- `src/components/Calculators/OST22Calculator.tsx`
- `src/components/Calculators/ToleranceCalculator.tsx` (if needed)
- `src/App.tsx` (add API status)

This plan will get you a production-ready React app with real API integration in ~3 hours total development time.