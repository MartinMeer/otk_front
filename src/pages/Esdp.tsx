/**
 * GOST 25347-82 Tolerance and Fits Calculator component
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calculator, Download, FileText, X } from 'lucide-react';
import { EsdpResponce } from '../types';
import AdPlacement from '../components/Ads/AdPlacement';
import { useAdStore } from '../store/adStore';
import { ApiService } from '../services/apiService';

export default function EsdpCalculator() {
  const [size, setSize] = useState<string>('');
  const [sizeError, setSizeError] = useState<string | null>(null);
  const validateSize = (v: string): string | null => {
    if (!v) return null; // allow empty; button will stay disabled
    // only digits with optional fractional part using dot
    return /^\d+(\.\d+)?$/.test(v)
      ? null
      : 'Размер должен быть числом. Используйте точку для дробных чисел: 0.01';
  };
  type ElementType = 'hole' | 'shaft';
  const [elementType, setElementType] = useState<ElementType>('hole');
  const [fundamental, setFundamental] = useState<string>('');
  const [grade, setGrade] = useState<string>('');

  // FundamentalTolerance -> available grades
  const HOLE_TOLERANCE_TO_GRADES: Record<string, string[]> = {
    A: ['9','10','11','12','13'],
    B: ['8','9','10','11','12','13'],
    C: ['8','9','10','11','12','13'],
    CD: ['6','7','8','9','10'],
    D: ['6','7','8','9','10','11','12','13'],
    E: ['5','6','7','8','9','10'],
    EF: ['3','4','5','6','7','8','9','10'],
    F: ['3','4','5','6','7','8','9','10'],
    FG: ['3','4','5','6','7','8','9','10'],
    G: ['3','4','5','6','7','8','9','10'],
    H: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'],
    J: ['6','7','8'],
    JS: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'],
    K: ['3','4','5','6','7','8','9','10'],
    M: ['3','4','5','6','7','8','9','10'],
    N: ['3','4','5','6','7','8','9','10','11'],
    P: ['3','4','5','6','7','8','9','10'],
    R: ['3','4','5','6','7','8','9','10'],
    S: ['3','4','5','6','7','8','9','10'],
    T: ['5','6','7','8'],
    U: ['5','6','7','8','9','10'],
    V: ['5','6','7','8'],
    X: ['5','6','7','8','9','10'],
    Y: ['6','7','8','9','10'],
    Z: ['6','7','8','9','10','11'],
    ZA: ['6','7','8','9','10','11'],
    ZB: ['7','8','9','10','11'],
    ZC: ['7','8','9','10','11'],
  };
  const SHAFT_TOLERANCE_TO_GRADES: Record<string, string[]> = {
    a: ['9','10','11','12','13'],
    b: ['8','9','10','11','12','13'],
    c: ['8','9','10','11','12'],
    cd: ['5','6','7','8','9','10'],
    d: ['5','6','7','8','9','10','11','12','13'],
    e: ['5','6','7','8','9','10'],
    ef: ['3','4','5','6','7','8','9','10'],
    f: ['3','4','5','6','7','8','9','10'],
    fg: ['3','4','5','6','7','8','9','10'],
    g: ['3','4','5','6','7','8','9','10'],
    h: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'],
    j: ['5','6','7','8'],
    js: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'],
    k: ['3','4','5','6','7','8','9','10','11','12','13'],
    m: ['3','4','5','6','7','8','9'],
    n: ['3','4','5','6','7','8','9'],
    p: ['3','4','5','6','7','8','9','10'],
    r: ['3','4','5','6','7','8','9','10'],
    s: ['3','4','5','6','7','8','9','10'],
    t: ['5','6','7','8'],
    u: ['5','6','7','8','9'],
    v: ['5','6','7','8'],
    x: ['5','6','7','8','9','10'],
    y: ['6','7','8','9','10'],
    za: ['6','7','8','9','10','11'],
    zb: ['7','8','9','10','11'],
    zc: ['7','8','9','10','11'],
    z: ['6','7','8','9','10','11'],
  };

  const fundamentalsForType = elementType === 'hole'
    ? Object.keys(HOLE_TOLERANCE_TO_GRADES)
    : Object.keys(SHAFT_TOLERANCE_TO_GRADES);

  const gradesForSelected = () => {
    if (!fundamental) return [] as string[];
    const map = elementType === 'hole' ? HOLE_TOLERANCE_TO_GRADES : SHAFT_TOLERANCE_TO_GRADES;
    return map[fundamental] || [];
  };

  useEffect(() => {
    setFundamental('');
    setGrade('');
  }, [elementType]);
  useEffect(() => {
    setGrade('');
  }, [fundamental]);

  const suggestion = size && !sizeError && fundamental && grade
    ? `${size}${fundamental}${grade}`
    : '';
  const [result, setResult] = useState<EsdpResponce | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showMobileAd, setShowMobileAd] = useState(true);

  const { updateContext } = useAdStore();

  // Update ad context when component mounts
  useEffect(() => {
    updateContext({ 
      pageType: 'esdp-calculator',
      calculatorType: 'gost-25347-82'
    });
  }, [updateContext]);

  const calculateTolerance = async () => {
    if (!suggestion) return;
    
    setIsCalculating(true);
    try {
      const resp = await ApiService.processEsdp(suggestion);
      
      const calculationResult: EsdpResponce = {
        upper_deviance: resp.upper_deviance,
        lower_deviance: resp.lower_deviance,
        max_mes_value: resp.max_mes_value,
        min_mes_value: resp.min_mes_value
      };
      setResult(calculationResult);
    } catch (e) {
      console.error('Error calculating tolerance:', e);
      // You might want to add error handling UI here
    } finally {
      setIsCalculating(false);
    }
  };

 

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">ГОСТ 25347-82</h1>
        <p className="text-gray-600">Единая система допусков и посадок</p>
      </div>

      {/* Desktop Layout with Sidebar */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  Значения предельных отклонений
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="element-type">Выберите тип элемента</Label>
                  <Select value={elementType} onValueChange={(v: string) => setElementType(v as ElementType)}>
                    <SelectTrigger id="element-type">
                      <SelectValue placeholder="Выберите тип элемента" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hole">Отверстие</SelectItem>
                      <SelectItem value="shaft">Вал</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Введите размер с чертежа (мм) </Label>
                  <Input
                    id="size"
                    type="text"
                    inputMode="numeric"
                    pattern="^\d+(\.\d+)?$"
                    step="0.001"
                    value={size}
                    onChange={(e) => {
                      const v = e.target.value.trim();
                      setSize(v);
                      setSizeError(validateSize(v));
                    }}
                    placeholder="Например: 10.5"
                    className="text-lg"
                    aria-invalid={!!sizeError}
                  />
                  {sizeError && (
                    <div className="text-sm text-red-600">{sizeError}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundamental">Основное отклонение</Label>
                  <Select value={fundamental} onValueChange={(v: string) => setFundamental(v)}>
                    <SelectTrigger id="fundamental">
                      <SelectValue placeholder="Выберите основное отклонение" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundamentalsForType.map((code) => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Квалитет (IT)</Label>
                  <Select value={grade} onValueChange={(v: string) => setGrade(v)} disabled={!fundamental}>
                    <SelectTrigger id="grade">
                      <SelectValue placeholder={fundamental ? 'Выберите квалитет' : 'Сначала выберите основное отклонение'} />
                    </SelectTrigger>
                    <SelectContent>
                      {gradesForSelected().map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>Строка для расчета</Label>
                  <div className="text-lg font-bold min-h-6">{suggestion || '—'}</div>
                  {/*<div className="text-xs text-gray-500">Проверка строки выполняется на сервере.</div>*/}
                </div>

                <Button 
                  onClick={calculateTolerance} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!suggestion || isCalculating}
                >
                  {isCalculating ? 'Расчет...' : 'Рассчитать'}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Результаты расчета</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Верхнее отклонение (ES/es)</div>
                      <div className="text-lg font-semibold text-blue-900">
                        {result.upper_deviance} мм
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Максимальный размер</div>
                      <div className="text-lg font-semibold text-green-700">
                        {result.max_mes_value} мм
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Нижнее отклонение (EI/ei)</div>
                      <div className="text-lg font-semibold text-blue-900">
                        {result.lower_deviance} мм
                      </div>
                    </div>
                  
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Минимальный размер</div>
                      <div className="text-lg font-semibold text-green-700">
                        {result.min_mes_value} мм
                      </div>
                    </div>
                  </div>

                  {/*<div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Интерпретация результатов</h4>
                    <p className="text-sm text-yellow-700">
                      Размер должен находиться в пределах от {result.minSize.toFixed(3)} мм 
                      до {result.maxSize.toFixed(3)} мм для соответствия заданному полю допуска.
                    </p>
                  </div>*/}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Reference Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Справочные материалы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="bg-transparent justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  ГОСТ 25347-82 PDF
                </Button>
                
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Ad Section 1 - Near Calculator */}
          <div className="sticky top-6">
            <AdPlacement 
              placement="sidebar-primary" 
              title="Рекомендуемые инструменты"
              maxAds={2}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                Значения предельных отклонений
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="element-type-mobile">Выберите тип элемента</Label>
                <Select value={elementType} onValueChange={(v: string) => setElementType(v as ElementType)}>
                  <SelectTrigger id="element-type-mobile">
                    <SelectValue placeholder="Выберите тип элемента" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hole">Отверстие</SelectItem>
                    <SelectItem value="shaft">Вал</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size-mobile">Введите размер с чертежа (мм)</Label>
                <Input
                  id="size-mobile"
                  type="text"
                  inputMode="numeric"
                  pattern="^\\d+(\\.\\d+)?$"
                  step="0.001"
                  value={size}
                  onChange={(e) => {
                    const v = e.target.value.trim();
                    setSize(v);
                    setSizeError(validateSize(v));
                  }}
                  placeholder="Например: 10.5"
                  className="text-lg"
                  aria-invalid={!!sizeError}
                />
                {sizeError && (
                  <div className="text-sm text-red-600">{sizeError}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundamental-mobile">Основное отклонение</Label>
                <Select value={fundamental} onValueChange={(v: string) => setFundamental(v)}>
                  <SelectTrigger id="fundamental-mobile">
                    <SelectValue placeholder="Выберите основное отклонение" />
                  </SelectTrigger>
                  <SelectContent>
                    {fundamentalsForType.map((code) => (
                      <SelectItem key={code} value={code}>{code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade-mobile">Квалитет (IT)</Label>
                <Select value={grade} onValueChange={(v: string) => setGrade(v)} disabled={!fundamental}>
                  <SelectTrigger id="grade-mobile">
                    <SelectValue placeholder={fundamental ? 'Выберите квалитет' : 'Сначала выберите основное отклонение'} />
                  </SelectTrigger>
                  <SelectContent>
                    {gradesForSelected().map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Строка для расчета</Label>
                <div className="text-lg font-bold min-h-6">{suggestion || '—'}</div>
                <div className="text-xs text-gray-500">Проверка строки выполняется на сервере.</div>
              </div>

              <Button 
                onClick={calculateTolerance} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!suggestion || isCalculating}
              >
                {isCalculating ? 'Расчет...' : 'Рассчитать'}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Результаты расчета</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Верхнее отклонение (ES/es)</div>
                    <div className="text-lg font-semibold text-blue-900">
                      {result.upper_deviance} мм
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Максимальный размер</div>
                    <div className="text-lg font-semibold text-green-700">
                      {result.max_mes_value} мм
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Нижнее отклонение (EI/ei)</div>
                    <div className="text-lg font-semibold text-blue-900">
                      {result.lower_deviance} мм
                    </div>
                  </div>
                
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Минимальный размер</div>
                    <div className="text-lg font-semibold text-green-700">
                      {result.min_mes_value} мм
                    </div>
                  </div>
                </div>

                {/*<div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Интерпретация результатов</h4>
                  <p className="text-sm text-yellow-700">
                    Размер должен находиться в пределах от {result.minSize.toFixed(3)} мм 
                    до {result.maxSize.toFixed(3)} мм для соответствия заданному полю допуска.
                  </p>
                </div>*/}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reference Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Справочные материалы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="bg-transparent justify-start">
                <Download className="w-4 h-4 mr-2" />
                ГОСТ 25347-82 PDF
              </Button>
              
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Floating Ad */}
      {showMobileAd && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
          <div className="relative">
            <button
              onClick={() => setShowMobileAd(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
              title="Закрыть рекламу"
            >
              <X className="w-4 h-4" />
            </button>
            <AdPlacement 
              placement="mobile-sticky" 
              maxAds={1}
            />
          </div>
        </div>
      )}

      {/* Quick Reference 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Основные поля допусков для отверстий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-blue-50 rounded text-center font-mono">H6</div>
              <div className="p-2 bg-blue-50 rounded text-center font-mono">H7</div>
              <div className="p-2 bg-blue-50 rounded text-center font-mono">H8</div>
              <div className="p-2 bg-blue-50 rounded text-center font-mono">H9</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">F7</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">F8</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">G7</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">G8</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Основные поля допусков для валов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-green-50 rounded text-center font-mono">h6</div>
              <div className="p-2 bg-green-50 rounded text-center font-mono">h7</div>
              <div className="p-2 bg-green-50 rounded text-center font-mono">h8</div>
              <div className="p-2 bg-green-50 rounded text-center font-mono">h9</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">f7</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">g6</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">k6</div>
              <div className="p-2 bg-gray-50 rounded text-center font-mono">n6</div>
            </div>
          </CardContent>
        </Card>
      </div>*/}
    </div>
  );
}