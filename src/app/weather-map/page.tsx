'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchWeatherForAllCities } from '@/app/weather-map/weather';
import { type City } from './types';

// Dynamically import the map to avoid SSR issues
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading global temperature map...</p>
      </div>
    </div>
  ),
});

export default function WeatherMap() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const citiesWithWeather = await fetchWeatherForAllCities();
        setCities(citiesWithWeather);
        // setLastUpdated(new Date()); // Can be used for showing last refresh time
      } catch (error) {
        console.error('Failed to load weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading global temperature map...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '91vh',
        minHeight: '600px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Demo Information Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white',
          padding: '12px 16px',
          fontSize: '14px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px' }}>ℹ️</span>
          <span>
            <strong>Demo Mode:</strong> Showing weather data for {cities.length}{' '}
            cities only. Search functionality is disabled due to API rate
            limits.
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <DynamicMap cities={cities} />
      </div>
    </div>
  );
}
