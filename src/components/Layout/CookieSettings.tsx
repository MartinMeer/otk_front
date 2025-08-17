import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useCookies } from '../../hooks/use-cookies';
import { useCookieConsent } from '../../hooks/use-cookie-consent';
import { COOKIE_DEFAULTS, COOKIE_NAMES, CONSENT_VALUES } from '../../config/cookieConfig';
import { Settings, Save } from 'lucide-react';

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieSettings: React.FC<CookieSettingsProps> = ({ isOpen, onClose }) => {
  const { setCookie, getCookie } = useCookies();
  const { refreshConsent } = useCookieConsent();
  const [settings, setSettings] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    functional: false
  });

  useEffect(() => {
    if (isOpen) {
      // Load current settings
      const analytics = getCookie(COOKIE_NAMES.ANALYTICS_CONSENT) === 'true';
      const functional = getCookie(COOKIE_NAMES.FUNCTIONAL_CONSENT) === 'true';
      
      setSettings({
        necessary: true,
        analytics,
        functional
      });
    }
  }, [isOpen, getCookie]);

  const handleSave = () => {
    // Save analytics consent
    setCookie(COOKIE_NAMES.ANALYTICS_CONSENT, settings.analytics ? 'true' : 'false', COOKIE_DEFAULTS);

    // Save functional consent
    setCookie(COOKIE_NAMES.FUNCTIONAL_CONSENT, settings.functional ? 'true' : 'false', COOKIE_DEFAULTS);

    // Update main consent
    setCookie(COOKIE_NAMES.CONSENT, CONSENT_VALUES.CUSTOM, COOKIE_DEFAULTS);

    // Refresh global consent state immediately
    refreshConsent();

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Настройки файлов cookie
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Necessary Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Необходимые файлы cookie</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Требуются для базовой работы сайта
                </p>
              </div>
              <Switch checked={settings.necessary} disabled />
            </div>
          </div>

          <Separator />

          {/* Analytics Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Аналитические файлы cookie</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Помогают анализировать использование сайта
                </p>
              </div>
              <Switch 
                checked={settings.analytics}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          {/* Functional Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Функциональные файлы cookie</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Сохраняют ваши настройки и предпочтения
                </p>
              </div>
              <Switch 
                checked={settings.functional}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, functional: checked }))
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Сохранить настройки
            </Button>
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 