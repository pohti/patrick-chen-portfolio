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
      }}
    >
      <DynamicMap cities={cities} />
    </div>
  );
}
