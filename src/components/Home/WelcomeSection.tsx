/**
 * Welcome section component for the home page
 */

import { Calculator, Shield, Zap, Users } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto h-16 px-2 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
          Ассистент контролера ОТК
        </h1>
        <p className="text-xl text-blue-700 mb-6 max-w-3xl mx-auto">
          Ваш надежный помощник в расчетах и измерениях.
        </p>
      </div>
    </section>
  );
}