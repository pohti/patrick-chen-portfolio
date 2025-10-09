'use client';

import { useEffect, useState } from 'react';
import { getCacheStatsServer } from '@/lib/weather';

interface CacheStats {
  total: number;
  valid: number;
  expired: number;
  totalCities: number;
  cacheHitRate: string;
  estimatedDailyCalls: number;
}

export default function ServerCacheMonitor() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateStats = async () => {
      try {
        const cacheStats = await getCacheStatsServer();
        setStats(cacheStats);
      } catch (error) {
        console.error('Failed to fetch cache stats:', error);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  const isEfficient = stats.valid >= stats.totalCities * 0.8; // 80% cache hit rate is good
  const quotaUsage = (stats.estimatedDailyCalls / 1000) * 100;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed bottom-4 right-4 z-[1001] px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
          isEfficient
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        Server Cache: {stats.cacheHitRate}
      </button>

      {/* Stats Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-[1001] bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border max-w-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span
              className={`w-2 h-2 ${isEfficient ? 'bg-green-500' : 'bg-orange-500'} rounded-full mr-2`}
            ></span>
            Server Cache Status
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cache Entries:</span>
              <span className="font-medium">{stats.total}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Valid/Expired:</span>
              <span className="font-medium">
                <span className="text-green-600">{stats.valid}</span>/
                <span className="text-red-600">{stats.expired}</span>
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Hit Rate:</span>
              <span
                className={`font-medium ${isEfficient ? 'text-green-600' : 'text-orange-600'}`}
              >
                {stats.cacheHitRate}
              </span>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Est. Daily Calls:</span>
                <span
                  className={`font-medium ${quotaUsage > 80 ? 'text-red-600' : 'text-blue-600'}`}
                >
                  {stats.estimatedDailyCalls} / 1000
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    quotaUsage > 80 ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(quotaUsage, 100)}%` }}
                ></div>
              </div>

              <div className="text-xs text-gray-500">
                Quota usage: {quotaUsage.toFixed(1)}%
              </div>
            </div>

            {stats.valid === stats.totalCities && (
              <div className="bg-green-50 border border-green-200 rounded p-2 mt-2">
                <p className="text-green-700 text-xs">
                  ✅ All data cached! No API calls needed.
                </p>
              </div>
            )}

            {quotaUsage > 80 && (
              <div className="bg-red-50 border border-red-200 rounded p-2 mt-2">
                <p className="text-red-700 text-xs">
                  ⚠️ High API usage! Consider longer cache TTL.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
