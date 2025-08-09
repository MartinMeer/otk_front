/**
 * GOST 25347-82 Tolerance and Fits Calculator component
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Calculator, Download, FileText, X } from 'lucide-react';
import { EsdpResponce } from '../types';
import AdPlacement from '../components/Ads/AdPlacement';
import { useAdStore } from '../store/adStore';
import { ApiService } from '../services/apiService';

export default function EsdpCalculator() {
  const [size, setSize] = useState<string>('');
  //const [tolerance, setTolerance] = useState<string>('');
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
                  Расчет допусков и посадок
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Номинальный размер (мм) и поле допуска </Label>
                  <Input
                    id="size"
                    type="number"
                    step="0.001"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Например: 18.123H7"
                    className="text-lg"
                  />
                </div>

                {/*<div className="space-y-2">
                  <Label htmlFor="tolerance">Обозначение поля допуска</Label>
                  <Input
                    id="tolerance"
                    type="text"
                    value={tolerance}
                    onChange={(e) => setTolerance(e.target.value)}
                    placeholder="Например: H7, h6, F8"
                    className="text-lg"
                  />
                  <div className="text-xs text-gray-500">
                    Примеры: H6, H7, h6, h7, f7, g6, k6, n6, p6, r6, s6
                  </div>
                </div>*/}

                <Button 
                  onClick={calculateTolerance} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!size || !tolerance || isCalculating}
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
                        {result.upperDeviation > 0 ? '+' : ''}{result.upperDeviation.toFixed(3)} мм
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Максимальный размер</div>
                      <div className="text-lg font-semibold text-green-700">
                        {result.maxSize.toFixed(3)} мм
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Нижнее отклонение (EI/ei)</div>
                      <div className="text-lg font-semibold text-blue-900">
                        {result.lowerDeviation.toFixed(3)} мм
                      </div>
                    </div>
                  
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Минимальный размер</div>
                      <div className="text-lg font-semibold text-green-700">
                        {result.minSize.toFixed(3)} мм
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
                Расчет допусков и посадок
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="size-mobile">Номинальный размер (мм) и поле допуска </Label>
                <Input
                  id="size-mobile"
                  type="number"
                  step="0.001"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Например: 18.123H7"
                  className="text-lg"
                />
              </div>

              {/*<div className="space-y-2">
                <Label htmlFor="tolerance-mobile">Обозначение поля допуска</Label>
                <Input
                  id="tolerance-mobile"
                  type="text"
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                  placeholder="Например: H7, h6, F8"
                  className="text-lg"
                />
                <div className="text-xs text-gray-500">
                  Примеры: H6, H7, h6, h7, f7, g6, k6, n6, p6, r6, s6
                </div>
              </div>*/}

              <Button 
                onClick={calculateTolerance} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!size || !tolerance || isCalculating}
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
                      {result.upperDeviation > 0 ? '+' : ''}{result.upperDeviation.toFixed(3)} мм
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Максимальный размер</div>
                    <div className="text-lg font-semibold text-green-700">
                      {result.maxSize.toFixed(3)} мм
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Нижнее отклонение (EI/ei)</div>
                    <div className="text-lg font-semibold text-blue-900">
                      {result.lowerDeviation.toFixed(3)} мм
                    </div>
                  </div>
                
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Минимальный размер</div>
                    <div className="text-lg font-semibold text-green-700">
                      {result.minSize.toFixed(3)} мм
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