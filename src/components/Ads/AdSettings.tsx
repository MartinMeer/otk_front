/**
 * Advertisement settings and preferences component
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Settings, BarChart3, Target, Shield } from 'lucide-react';
import { useAdStore } from '../../store/adStore';

export default function AdSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    config, 
    userPreferences, 
    adUnits, 
    updateConfig, 
    setUserPreferences 
  } = useAdStore();

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-32 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
          size="sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Ads
        </Button>
      </div>
    );
  }

  const totalImpressions = adUnits.reduce((sum, ad) => sum + ad.metrics.impressions, 0);
  const totalClicks = adUnits.reduce((sum, ad) => sum + ad.metrics.clicks, 0);
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[600px] overflow-hidden bg-white border rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-3 bg-green-600 text-white">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="font-semibold">Ad Management</span>
        </div>
        <Button 
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-green-700 h-auto p-1"
        >
          ×
        </Button>
      </div>

      <div className="p-4 max-h-[500px] overflow-y-auto space-y-4">
        {/* Ad Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Ad Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Ads</span>
              <Switch
                checked={config.enabled}
                onCheckedChange={(checked) => updateConfig({ enabled: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Allow Personalized Ads</span>
              <Switch
                checked={userPreferences.allowAds}
                onCheckedChange={(checked) => setUserPreferences({ allowAds: checked })}
              />
            </div>

            <div className="text-xs text-gray-500">
              Max ads per page: {config.maxAdsPerPage}
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-blue-600">{totalImpressions}</div>
                <div className="text-xs text-gray-500">Impressions</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-600">{totalClicks}</div>
                <div className="text-xs text-gray-500">Clicks</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-purple-600">{averageCTR.toFixed(2)}%</div>
                <div className="text-xs text-gray-500">CTR</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Ads */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              Active Ads ({adUnits.filter(ad => ad.active).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {adUnits.filter(ad => ad.active).map(ad => (
                <div key={ad.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{ad.title}</div>
                    <div className="text-gray-500">{ad.placement}</div>
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    <Badge variant="outline" className="mb-1">
                      CTR: {ad.metrics.ctr > 0 ? `${(ad.metrics.ctr * 100).toFixed(1)}%` : '0%'}
                    </Badge>
                    <div className="text-gray-400">
                      {ad.metrics.impressions}i / {ad.metrics.clicks}c
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Blocked Categories */}
        {userPreferences.blockedCategories.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600">Blocked Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {userPreferences.blockedCategories.map(category => (
                  <Badge 
                    key={category} 
                    variant="destructive" 
                    className="text-xs cursor-pointer"
                    onClick={() => {
                      setUserPreferences({
                        blockedCategories: userPreferences.blockedCategories.filter(c => c !== category)
                      });
                    }}
                  >
                    {category} ×
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Click to unblock category
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
