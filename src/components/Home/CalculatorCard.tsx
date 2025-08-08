/**
 * Calculator card component for navigation to different calculators
 */

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  standard?: string;
}

export default function CalculatorCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  standard 
}: CalculatorCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 border-blue-200">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-blue-900">{title}</CardTitle>
        {standard && (
          <div className="text-sm text-blue-600 font-medium">{standard}</div>
        )}
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          onClick={() => window.location.hash = href}
        >
          Перейти
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}