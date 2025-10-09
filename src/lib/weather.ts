'use server';

import { type City, majorCities } from './cities';
import weatherCache from './cache';

// OpenWeatherMap API configuration (server-side only)
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface OpenWeatherMapResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Server action to fetch weather for a single city
async function fetchWeatherForCity(
  city: City
): Promise<OpenWeatherMapResponse | null> {
  const cacheKey = city.id;

  // Check server-side cache first
  const cachedData = await weatherCache.get<OpenWeatherMapResponse>(cacheKey);

  console.log(
    `🔍 Cache lookup for ${city.name}: key="${cacheKey}", hit=${!!cachedData}`
  );
  if (cachedData) {
    console.log(`Cache hit for ${city.name}`);
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
  }

  return null;
}

// Server action to fetch weather for all cities with smart batching
export async function fetchWeatherForAllCities(): Promise<City[]> {
  const citiesWithWeather: City[] = [];

  for (const city of majorCities) {
    let curData = await weatherCache.get<OpenWeatherMapResponse>(city.id);
    if (curData) {
      console.log(`✅ Cache hit for ${city.name}`);
    } else {
      curData = await fetchWeatherForCity(city);
    }

    if (curData) {
      city.temperature = Math.round(curData.main.temp);
      citiesWithWeather.push(city);
    }
  }
  console.log(
    `Total cities: ${majorCities.length} | Total cache hits: ${citiesWithWeather.length}`
  );

  return citiesWithWeather;
}
