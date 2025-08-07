/**
 * Welcome section component for the home page
 */

import { Calculator, Shield, Zap, Users } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
          Ассистент контролера ОТК
        </h1>
        <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto">
          Ваш надежный помощник в расчетах и измерениях. 
          Профессиональный инструмент для контроля качества и технических измерений.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Точные расчеты</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Соответствие ГОСТу</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Быстрая работа</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Для профессионалов</h3>
          </div>
        </div>
      </div>
    </section>
  );
}