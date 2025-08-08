import React from 'react';
import { Button } from '../ui/button';
import { useCookieConsent } from '../../hooks/use-cookie-consent';

export const CookieBanner: React.FC = () => {
  const { showBanner, acceptAll, declineAll } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80">
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">
          Использование файлов cookie
        </h3>
        <p className="text-gray-600 mb-4">
          Мы используем файлы cookie для улучшения работы сайта.
        </p>
        <div className="flex gap-3">
          <Button onClick={acceptAll}>
            Принять все
          </Button>
          <Button variant="outline" onClick={declineAll}>
            Отклонить
          </Button>
        </div>
      </div>
    </div>
  );
}; 