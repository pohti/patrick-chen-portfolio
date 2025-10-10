'use server';

import { majorCities } from './cities';
import weatherCache from './cache';
import { type OpenWeatherMapResponse, type City } from './types';

// OpenWeatherMap API configuration (server-side only)
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Server action to fetch weather for a single city
async function fetchWeatherForCity(
  city: City
): Promise<OpenWeatherMapResponse | null> {
  if (API_KEY) {
    try {
      console.log(`🌐 Making API call for ${city.name}`);
      const response = await fetch(
        `${BASE_URL}?lat=${city.lat}&lon=${city.lng}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        console.error(`API error for ${city.name}:`, response.statusText);
        throw new Error('Weather API request failed');
      }

      const data: OpenWeatherMapResponse = await response.json();

      return data;
    } catch (error) {
      console.error(`Failed to fetch weather for ${city.name}:`, error);

      return null;
    }
  } else {
    console.warn('⚠️ OPENWEATHER_API_KEY is not set. Returning null.');
    return null;
  }
}

// Server action to fetch weather for all cities with smart batching
export async function fetchWeatherForAllCities(): Promise<City[]> {
  const cacheKey = 'weather-data';

  // Check server-side cache first
  const cachedData = await weatherCache.get<City[]>(cacheKey);

  console.log(
    `🔍 Cache lookup for weather data \t hit=${cachedData ? '✅' : '❌'}`
  );
  if (cachedData) {
    return cachedData;
  }

  for (let i = 0; i < majorCities.length; i++) {
    const city = majorCities[i];
    const curData = await fetchWeatherForCity(city);
    if (curData) {
      majorCities[i] = {
        ...city,
        temperature: Math.round(curData.main.temp),
        description: curData.weather[0]?.description,
        feels_like: Math.round(curData.main.feels_like),
        pressure: curData.main.pressure,
        wind_speed: curData.wind.speed,
        wind_deg: curData.wind.deg,
      };
    }
  }

  await weatherCache.set(cacheKey, majorCities, { ex: 7200 }); // Cache for 2 hours
  console.log('💾 Weather data cached for 2 hours');

  return majorCities;
}
