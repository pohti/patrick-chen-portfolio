'use server';

import { majorCities } from './cities';
import weatherCache from './cache';
import { OpenWeatherMapResponse, type City } from './types';

// OpenWeatherMap API configuration (server-side only)
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Server action to fetch weather for a single city
async function fetchWeatherForCity(
  city: City
): Promise<OpenWeatherMapResponse | null> {
  const cacheKey = city.id;

  // Check server-side cache first
  const cachedData = await weatherCache.get<OpenWeatherMapResponse>(cacheKey);

  console.log(
    `🔍 Cache lookup for ${city.name} \t hit=${cachedData ? '✅' : '❌'}`
  );
  if (cachedData) {
    return cachedData;
  }

  //If API key is available, use real API
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

      // Cache the response for 120 minutes on the server
      weatherCache.set(cacheKey, data, { ex: 7200 });
      console.log(
        `💾 Cached weather for ${city.name}: key="${cacheKey}", temp=${Math.round(data.main.temp)}°C`
      );

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
  for (let i = 0; i < majorCities.length; i++) {
    const city = majorCities[i];
    let curData = await weatherCache.get<OpenWeatherMapResponse>(city.id);
    curData = await fetchWeatherForCity(city);
    if (curData) {
      majorCities[i] = {
        ...city,
        temperature: Math.round(curData.main.temp),
      };
    }
  }
  return majorCities;
}
