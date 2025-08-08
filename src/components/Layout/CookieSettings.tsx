import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useCookies } from '../../hooks/use-cookies';
import { Settings, Save } from 'lucide-react';

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieSettings: React.FC<CookieSettingsProps> = ({ isOpen, onClose }) => {
  const { setCookie, getCookie } = useCookies();
  const [settings, setSettings] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    functional: false
  });

  useEffect(() => {
    if (isOpen) {
      // Load current settings
      const analytics = getCookie('analytics_consent') === 'true';
      const functional = getCookie('functional_consent') === 'true';
      
      setSettings({
        necessary: true,
        analytics,
        functional
      });
    }
  }, [isOpen, getCookie]);

  const handleSave = () => {
    // Save analytics consent
    setCookie('analytics_consent', settings.analytics ? 'true' : 'false', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });

    // Save functional consent
    setCookie('functional_consent', settings.functional ? 'true' : 'false', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });

    // Update main consent
    setCookie('cookie_consent', 'custom', {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });

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