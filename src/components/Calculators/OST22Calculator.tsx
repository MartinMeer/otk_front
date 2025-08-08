/**
 * OST 22 Calculator component for unspecified tolerances calculation
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calculator, Download, FileText } from 'lucide-react';
import { CalculatorResult } from '../../types';


type ElementType = 'hole' | 'shaft' | 'conditional-hole' | 'conditional-shaft' | 'neither';

export default function OST22Calculator() {
  const [size, setSize] = useState<string>('');
  const [elementType, setElementType] = useState<ElementType>('hole');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateTolerance = async () => {
    if (!size || isNaN(Number(size))) return;
    
    setIsCalculating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock calculation logic - in real implementation this would use actual OST 22 tables
    const sizeValue = Number(size);
    let upperDev = 0;
    let lowerDev = 0;
    
    // Simplified calculation based on size ranges and element type
    if (elementType === 'hole') {
      if (sizeValue <= 3) {
        upperDev = 0.1;
        lowerDev = 0;
      } else if (sizeValue <= 6) {
        upperDev = 0.12;
        lowerDev = 0;
      } else if (sizeValue <= 30) {
        upperDev = 0.2;
        lowerDev = 0;
      } else {
        upperDev = 0.3;
        lowerDev = 0;
      }
    } else if (elementType === 'shaft') {
      if (sizeValue <= 3) {
        upperDev = 0;
        lowerDev = -0.1;
      } else if (sizeValue <= 6) {
        upperDev = 0;
        lowerDev = -0.12;
      } else if (sizeValue <= 30) {
        upperDev = 0;
        lowerDev = -0.2;
      } else {
        upperDev = 0;
        lowerDev = -0.3;
      }
    } else {
      // For other types, use intermediate values
      upperDev = 0.15;
      lowerDev = -0.15;
    }

    const calculationResult: CalculatorResult = {
      upperDeviation: upperDev,
      lowerDeviation: lowerDev,
      maxSize: sizeValue + upperDev,
      minSize: sizeValue + lowerDev
    };

    setResult(calculationResult);
    setIsCalculating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">ОСТ 1 00022-80</h1>
        <p className="text-gray-600">Неуказанные предельные отклонения</p>
      </div>

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
              Расчет отклонений
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="size">Введите размер с чертежа (мм)</Label>
              <Input
                id="size"
                type="number"
                step="0.001"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Например: 10.5"
                className="text-lg"
              />
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
                  <SelectItem value="conditional-hole">Условное отверстие</SelectItem>
                  <SelectItem value="conditional-shaft">Условный вал</SelectItem>
                  <SelectItem value="neither">Ни отверстие, ни вал</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={calculateTolerance} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!size || isCalculating}
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
                      {result.upperDeviation > 0 ? '+' : ''}{result.upperDeviation.toFixed(3)} мм
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Максимальный размер</div>
                    <div className="text-lg font-semibold text-green-700">
                      {result.maxSize.toFixed(3)} мм
                    </div>
                  </div>
                </div>
                
                {/* Row 2: Нижнее отклонение | Минимальный размер */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Нижнее отклонение</div>
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
  );
}