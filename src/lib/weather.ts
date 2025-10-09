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
async function fetchWeatherForCityServer(city: City): Promise<number | null> {
  const cacheKey = `weather_${city.lat}_${city.lng}`;

  // Check server-side cache first
  const cachedData = await weatherCache.get<OpenWeatherMapResponse>(cacheKey);

  console.log({ cacheKey, cachedData });
  if (cachedData) {
    return Math.round(cachedData.main.temp);
  }

  // If API key is available, use real API
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
      await weatherCache.set(cacheKey, data, 120);

      return Math.round(data.main.temp);
    } catch (error) {
      console.error(`Failed to fetch weather for ${city.name}:`, error);

      return null;
    }
  }

  return null;
}

// Server action to fetch weather for all cities with smart batching
export async function fetchWeatherForAllCitiesServer(): Promise<City[]> {
  console.log('🚀 Starting server-side weather fetch');

  // Check cache statistics
  const cacheStats = await weatherCache.getStats();
  console.log(
    `📊 Cache stats: ${cacheStats.valid} valid, ${cacheStats.expired} expired, ${cacheStats.total} total (${cacheStats.source})`
  );

  // First pass: separate cached vs uncached cities
  const cachedResults: City[] = [];
  const uncachedCities: City[] = [];

  for (const city of majorCities) {
    const cacheKey = `weather_${city.lat}_${city.lng}`;
    const cachedData = await weatherCache.get<OpenWeatherMapResponse>(cacheKey);

    if (cachedData) {
      cachedResults.push({
        ...city,
        temperature: Math.round(cachedData.main.temp),
      });
    } else {
      uncachedCities.push(city);
    }
  }

  console.log(
    `✅ Cache hits: ${cachedResults.length}, API calls needed: ${uncachedCities.length}`
  );

  // Second pass: fetch uncached cities with rate limiting
  const uncachedResults: City[] = [];

  if (uncachedCities.length > 0) {
    // Process in batches to respect rate limits
    const BATCH_SIZE = 5;
    const DELAY_BETWEEN_REQUESTS = 200; // 200ms delay

    for (let i = 0; i < uncachedCities.length; i += BATCH_SIZE) {
      const batch = uncachedCities.slice(i, i + BATCH_SIZE);

      console.log(
        `🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(uncachedCities.length / BATCH_SIZE)}`
      );

      // Process batch with delays
      const batchPromises = batch.map(
        (city, index) =>
          new Promise<City>((resolve) => {
            setTimeout(async () => {
              const temperature = await fetchWeatherForCityServer(city);
              resolve({
                ...city,
                temperature: temperature ?? undefined,
              });
            }, index * DELAY_BETWEEN_REQUESTS);
          })
      );

      const batchResults = await Promise.all(batchPromises);
      uncachedResults.push(...batchResults);

      // Add delay between batches if there are more
      if (i + BATCH_SIZE < uncachedCities.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, DELAY_BETWEEN_REQUESTS * 2)
        );
      }
    }
  }

  const allResults = [...cachedResults, ...uncachedResults];
  console.log(`🎯 Completed: ${allResults.length} cities processed`);

  return allResults;
}

// Server action to get cache statistics
export async function getCacheStatsServer() {
  const stats = await weatherCache.getStats();
  const totalCities = majorCities.length;
  const cacheHitRate =
    totalCities > 0 ? Math.round((stats.valid / totalCities) * 100) : 0;

  return {
    ...stats,
    totalCities,
    cacheHitRate: `${cacheHitRate}%`,
    estimatedDailyCalls: Math.max(0, (totalCities - stats.valid) * 48), // 48 refreshes per day (every 30min)
  };
}
