'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { City } from '@/lib/cities';
import { fetchWeatherForAllCities } from '@/lib/weather';

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

  // Simulate real-time updates by adding small variations
  const updateTemperatures = () => {
    setCities((prevCities) =>
      prevCities.map((city) => ({
        ...city,
        temperature: city.temperature,
      }))
    );
    // setLastUpdated(new Date()); // Can be used for showing last refresh time
  };

  useEffect(() => {
    loadWeatherData();

    // Update temperatures every 30 seconds for demo purposes
    const interval = setInterval(updateTemperatures, 30000);

    return () => clearInterval(interval);
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
    <div className="relative w-full h-screen">
      {/* Map */}
      <div className="pt-20 h-full">
        <DynamicMap cities={cities} />
      </div>

      {/* TODO: legend for temperature colors */}
    </div>
  );
}
