import React, { useState } from 'react';
import { useCookies } from '../../hooks/use-cookies';
import { createCookieOptions } from '../../config/cookieConfig';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

export const CookieExample: React.FC = () => {
  const { isSupported, setCookie, getCookie, removeCookie } = useCookies({
    onError: (error) => console.error('Cookie error:', error)
  });

  const [cookieName, setCookieName] = useState('user_preference');
  const [cookieValue, setCookieValue] = useState('dark_mode');
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  const handleSetCookie = () => {
    const success = setCookie(cookieName, cookieValue, createCookieOptions({
      maxAge: 3600 // 1 hour override for demo
    }));
    
    if (success) {
      alert('Cookie set successfully!');
      setCurrentValue(getCookie(cookieName));
    }
  };

  const handleGetCookie = () => {
    const value = getCookie(cookieName);
    setCurrentValue(value);
  };

  const handleRemoveCookie = () => {
    const success = removeCookie(cookieName);
    if (success) {
      alert('Cookie removed successfully!');
      setCurrentValue(null);
    }
  };

  if (!isSupported) {
    return (
      <Alert>
        <AlertDescription>
          Cookies are not supported in this browser or are disabled.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cookie Management Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cookie Name:</label>
          <Input
            value={cookieName}
            onChange={(e) => setCookieName(e.target.value)}
            placeholder="Enter cookie name"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Cookie Value:</label>
          <Input
            value={cookieValue}
            onChange={(e) => setCookieValue(e.target.value)}
            placeholder="Enter cookie value"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSetCookie} variant="default">
            Set Cookie
          </Button>
          <Button onClick={handleGetCookie} variant="outline">
            Get Cookie
          </Button>
          <Button onClick={handleRemoveCookie} variant="destructive">
            Remove Cookie
          </Button>
        </div>

        {currentValue !== null && (
          <Alert>
            <AlertDescription>
              Current value for "{cookieName}": {currentValue}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}; 