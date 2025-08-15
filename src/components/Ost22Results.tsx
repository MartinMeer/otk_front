import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Ost22Responce } from '@/types';

export interface Ost22ResultsProps {
  result: Ost22Responce;
}

export default function Ost22Results({ result }: Ost22ResultsProps) {
  return (
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
                {result.upperDeviation} мм
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Максимальный размер</div>
              <div className="text-lg font-semibold text-green-700">
                {result.maxMesSize} мм
              </div>
            </div>
          </div>

          {/* Row 2: Нижнее отклонение | Минимальный размер */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Нижнее отклонение</div>
              <div className="text-lg font-semibold text-blue-900">
                {result.lowerDeviation} мм
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Минимальный размер</div>
              <div className="text-lg font-semibold text-green-700">
                {result.minMesSize} мм
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


