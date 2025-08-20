/**
 * OST 22 Calculator component for unspecified tolerances calculation
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calculator, Download, FileText, X } from 'lucide-react';
import { Ost22Responce } from '../types';
import AdPlacement from '../components/Ads/AdPlacement';
import { ApiService } from '../services/apiService';
import { DesktopHoverOverlayImage } from '@/components/UIutils/HoverOverlayImage';
import Ost22Form from '../components/Ost22Form';
import Ost22Results from '../components/Ost22Results';


type ElementType = 'hole' | 'shaft' | 'quasi_hole' | 'quasi_shaft' | 'undef';

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

  const outputSection = async () => {
    if (!size || isNaN(Number(size))) return;
    setIsCalculating(true);
    try {
      const resp = await ApiService.processOst22(size);
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
            {/* Hole card */}
            <Card className="p-4 group">
              <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов отверстий</h3>
              <DesktopHoverOverlayImage
                src="/images/ost22-hole.webp"
                alt="Размеры элементов отверстий"
                caption="Размеры элементов отверстий"
              />
            </Card>
            {/* Shaft card */}
            <Card className="p-4 group">
              <h3 className="font-semibold text-sm text-center mb-2">Размеры элементов валов</h3>
              <DesktopHoverOverlayImage
                src="/images/ost22-shaft.webp"
                alt="Размеры элементов валов"
                caption="Размеры элементов валов"
              
              />
            </Card>
            {/* Undefined card */}
            <Card className="p-4 group">
              <h3 className="font-semibold text-sm text-center mb-2">
                Размеры элементов, не относящихся к отверстиям и валам
              </h3>
              <DesktopHoverOverlayImage
                src="/images/ost22-undef.webp"
                alt="Размеры элементов, не относящихся к отверстиям и валам"
                caption="Размеры элементов, не относящихся к отверстиям и валам"
              />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  Значения предельных отклонений
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Ost22Form
                  size={size}
                  sizeError={sizeError}
                  elementType={elementType}
                  onSizeChange={(value) => {
                    const v = value.trim();
                    setSize(v);
                    setSizeError(validateSize(v));
                  }}
                  onElementTypeChange={(value) => setElementType(value as ElementType)}
                  onSubmit={outputSection}
                  isCalculating={isCalculating}
                  idSuffix="desktop"
                  inputMode="decimal"
                />
              </CardContent>
            </Card>

            {/* Results */}
            {result && <Ost22Results result={result} />}
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
                <Button asChild variant="outline" className="bg-transparent justify-start">
                  <a href="/downloads/ost-1-00022-80.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    ОСТ 1 00022-80 PDF
                  </a>
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
                Значения предельных отклонений              </CardTitle>
            </CardHeader>
            <CardContent>
              <Ost22Form
                size={size}
                sizeError={sizeError}
                elementType={elementType}
                onSizeChange={(value) => {
                  const v = value.trim();
                  setSize(v);
                  setSizeError(validateSize(v));
                }}
                onElementTypeChange={(value) => setElementType(value as ElementType)}
                onSubmit={outputSection}
                isCalculating={isCalculating}
                idSuffix="mobile"
                inputMode="text"
              />
            </CardContent>
          </Card>

          {/* Results */}
          {result && <Ost22Results result={result} />}
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
              <Button asChild variant="outline" className="bg-transparent justify-start">
                <a href="/downloads/ost-1-00022-80.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  ОСТ 1 00022-80 PDF
                </a>
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