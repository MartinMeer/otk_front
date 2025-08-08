import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { X, Settings, CheckCircle } from 'lucide-react';
import { useCookies } from '../../hooks/use-cookies';

interface CookieConsentProps {
  onConsentChange?: (consent: boolean) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const { setCookie, getCookie } = useCookies();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = getCookie('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, [getCookie]);

  const handleAccept = () => {
    setCookie('cookie_consent', 'accepted', {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'Lax'
    });
    
    // Set analytics consent
    setCookie('analytics_consent', 'true', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    
    setIsVisible(false);
    onConsentChange?.(true);
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'declined', {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'Lax'
    });
    
    // Set analytics consent to false
    setCookie('analytics_consent', 'false', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    
    setIsVisible(false);
    onConsentChange?.(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Использование файлов cookie
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Мы используем файлы cookie для улучшения работы сайта, анализа трафика 
                и персонализации контента. Продолжая использовать сайт, вы соглашаетесь 
                с нашей политикой использования файлов cookie.
              </p>
              
              {showDetails && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Типы используемых cookie:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Необходимые:</strong> Для базовой работы сайта</li>
                    <li>• <strong>Аналитические:</strong> Для анализа использования сайта</li>
                    <li>• <strong>Функциональные:</strong> Для сохранения ваших настроек</li>
                  </ul>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Принять все
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleDecline}
                >
                  Отклонить
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showDetails ? 'Скрыть детали' : 'Подробнее'}
                </Button>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleDecline}
              className="ml-4"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 