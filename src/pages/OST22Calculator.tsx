/**
 * OST 22 Calculator component for unspecified tolerances calculation
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calculator, Download, FileText, X } from 'lucide-react';
import { Ost22Responce, Ost22Request } from '../types';
import AdPlacement from '../components/Ads/AdPlacement';
import { ApiService } from '../services/apiService';


type ElementType = 'hole' | 'shaft' | 'conditional-hole' | 'conditional-shaft' | 'neither';

export default function OST22Calculator() {
  const [size, setSize] = useState<string>('');
  const [sizeError, setSizeError] = useState<string | null>(null);
  const validateSize = (v: string): string | null => {
    if (!v) return null; // allow empty; button will stay disabled
    // only digits with optional fractional part using dot
    return /^\d+(\.\d+)?$/.test(v)
      ? null
      : 'Размер должен быть числом. Используйте точку для дробных чисел: 0.01';
  };


  const [elementType, setElementType] = useState<ElementType>('hole');
  const [result, setResult] = useState<Ost22Responce | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showMobileAd, setShowMobileAd] = useState(true);

  const calculateSection = async () => {
    if (!size || isNaN(Number(size))) return;
    setIsCalculating(true);
    try {
      const resp = await ApiService.processOst22(elementType, size);
      //const sizeValue = Number(size);
      const upperDev = resp.upper_deviance;
      const lowerDev = resp.lower_deviance;
      const max_mes_value = resp.max_mes_value;
      const min_mes_value = resp.min_mes_value;             


      const calculationResult: Ost22Responce = {
        upper_deviance: upperDev,
        lower_deviance: lowerDev,
        max_mes_value: max_mes_value,
        min_mes_value: min_mes_value
      };
      setResult(calculationResult);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">ОСТ 1 00022-80</h1>
        <p className="text-gray-600">Неуказанные предельные отклонения</p>
      </div>

      {/* Desktop Layout with Sidebar */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Technical Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 group">
              <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов отверстий</h3>
              <div className="relative">
                <img 
                  src="/images/ost22-hole.webp" 
                  alt="Размеры элементов отверстий"
                  className="w-full h-48 object-contain rounded bg-gray-50 transition-transform duration-200 group-hover:scale-105"
                />
                {/* Full view overlay for desktop */}
                <div className="hidden md:block absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white p-4 rounded-lg shadow-2xl max-w-2xl max-h-96 transform scale-90 group-hover:scale-100 transition-transform duration-200">
                    <img 
                      src="/images/ost22-hole.webp" 
                      alt="Размеры элементов отверстий - полный вид"
                      className="w-full h-auto object-contain max-h-80"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center">Размеры элементов отверстий</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4 group">
              <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов валов</h3>
              <div className="relative">
                <img 
                  src="/images/ost22-shaft.webp" 
                  alt="Размеры элементов валов"
                  className="w-full h-48 object-contain rounded bg-gray-50 transition-transform duration-200 group-hover:scale-105"
                />
                {/* Full view overlay for desktop */}
                <div className="hidden md:block absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white p-4 rounded-lg shadow-2xl max-w-2xl max-h-96 transform scale-90 group-hover:scale-100 transition-transform duration-200">
                    <img 
                      src="/images/ost22-shaft.webp" 
                      alt="Размеры элементов валов - полный вид"
                      className="w-full h-auto object-contain max-h-80"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center">Размеры элементов валов</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4 group">
              <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов, не относящихся к отверстиям и валам</h3>
              <div className="relative">
                <img 
                  src="/images/ost22-undef.webp" 
                  alt="Размеры элементов, не относящихся к отверстиям и валам"
                  className="w-full h-48 object-contain rounded bg-gray-50 transition-transform duration-200 group-hover:scale-105"
                />
                {/* Full view overlay for desktop */}
                <div className="hidden md:block absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white p-4 rounded-lg shadow-2xl max-w-2xl max-h-96 transform scale-90 group-hover:scale-100 transition-transform duration-200">
                    <img 
                      src="/images/ost22-undef.webp" 
                      alt="Размеры элементов, не относящихся к отверстиям и валам - полный вид"
                      className="w-full h-auto object-contain max-h-80"
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center">Размеры элементов, не относящихся к отверстиям и валам</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  Расчет предельных отклонений
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Введите размер с чертежа (мм)</Label>
                  <Input
                    id="size"
                    type="text"
                    inputMode="decimal"
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
                  <Label htmlFor="element-type">Тип элемента</Label>
                  <Select value={elementType} onValueChange={(value: ElementType) => setElementType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип элемента" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hole">Отверстие</SelectItem>
                      <SelectItem value="shaft">Вал</SelectItem>
                      <SelectItem value="quasi_hole">Условное отверстие</SelectItem>
                      <SelectItem value="quasi_shaft">Условный вал</SelectItem>
                      <SelectItem value="undef">Ни отверстие, ни вал</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateSection} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!size || !!sizeError || isCalculating}
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
                  <div className="space-y-3">
                    {/* Row 1: Верхнее отклонение | Максимальный размер */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">Верхнее отклонение</div>
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
                    </div>
                    
                    {/* Row 2: Нижнее отклонение | Минимальный размер */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">Нижнее отклонение</div>
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
                  </div>
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
                  ОСТ 1 00022-80 PDF
                </Button>
               
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Ad Section 1 - Near Images */}
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
        {/* Technical Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 group">
            <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов отверстий</h3>
            <div className="relative">
              <img 
                src="/images/ost22-hole.webp" 
                alt="Размеры элементов отверстий"
                className="w-full h-48 object-contain rounded bg-gray-50 transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Card>
          <Card className="p-4 group">
            <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов валов</h3>
            <div className="relative">
              <img 
                src="/images/ost22-shaft.webp" 
                alt="Размеры элементов валов"
                className="w-full h-48 object-contain rounded bg-gray-50 transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Card>
          <Card className="p-4 group">
            <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов, не относящихся к отверстиям и валам</h3>
            <div className="relative">
              <img 
                src="/images/ost22-undef.webp" 
                alt="Размеры элементов, не относящихся к отверстиям и валам"
                className="w-full h-48 object-contain rounded bg-gray-50 transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                Расчет предельных отклонений              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="size-mobile">Введите размер с чертежа (мм)</Label>
                <Input
                  id="size-mobile"
                  type="text"
                  inputMode="decimal"
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
                <Label htmlFor="element-type-mobile">Тип элемента</Label>
                <Select value={elementType} onValueChange={(value: ElementType) => setElementType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип элемента" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hole">Отверстие</SelectItem>
                    <SelectItem value="shaft">Вал</SelectItem>
                    <SelectItem value="quasi_hole">Условное отверстие</SelectItem>
                    <SelectItem value="quasi_shaft">Условный вал</SelectItem>
                    <SelectItem value="undef">Ни отверстие, ни вал</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateSection} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!size || !!sizeError || isCalculating}
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
                <div className="space-y-3">
                  {/* Row 1: Верхнее отклонение | Максимальный размер */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Верхнее отклонение</div>
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
                  </div>
                  
                  {/* Row 2: Нижнее отклонение | Минимальный размер */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Нижнее отклонение</div>
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
                </div>
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
                ОСТ 1 00022-80 PDF
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
    </div>
  );
}