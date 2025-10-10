// TODO: update this interface to contain more weather info

import { type City } from './types';

export const majorCities: City[] = [
  // North America
  { id: 'us_ny', name: 'New York', country: 'US', lat: 40.7128, lng: -74.006 },
  {
    id: 'us_la',
    name: 'Los Angeles',
    country: 'US',
    lat: 34.0522,
    lng: -118.2437,
  },
  { id: 'us_ch', name: 'Chicago', country: 'US', lat: 41.8781, lng: -87.6298 },
  { id: 'ca_to', name: 'Toronto', country: 'CA', lat: 43.6532, lng: -79.3832 },
  {
    id: 'mx_mc',
    name: 'Mexico City',
    country: 'MX',
    lat: 19.4326,
    lng: -99.1332,
  },

  // Europe
  { id: 'gb_ln', name: 'London', country: 'GB', lat: 51.5074, lng: -0.1278 },
  { id: 'fr_pa', name: 'Paris', country: 'FR', lat: 48.8566, lng: 2.3522 },
  { id: 'de_be', name: 'Berlin', country: 'DE', lat: 52.52, lng: 13.405 },
  { id: 'es_ma', name: 'Madrid', country: 'ES', lat: 40.4168, lng: -3.7038 },
  { id: 'it_ro', name: 'Rome', country: 'IT', lat: 41.9028, lng: 12.4964 },

  // Asia
  { id: 'jp_to', name: 'Tokyo', country: 'JP', lat: 35.6762, lng: 139.6503 },
  { id: 'cn_bj', name: 'Beijing', country: 'CN', lat: 39.9042, lng: 116.4074 },
  { id: 'cn_sh', name: 'Shanghai', country: 'CN', lat: 31.2304, lng: 121.4737 },
  { id: 'in_mu', name: 'Mumbai', country: 'IN', lat: 19.076, lng: 72.8777 },
  { id: 'kr_se', name: 'Seoul', country: 'KR', lat: 37.5665, lng: 126.978 },

  // South America
  {
    id: 'br_sp',
    name: 'São Paulo',
    country: 'BR',
    lat: -23.5558,
    lng: -46.6396,
  },
  {
    id: 'ar_ba',
    name: 'Buenos Aires',
    country: 'AR',
    lat: -34.6118,
    lng: -58.396,
  },
  { id: 'pe_li', name: 'Lima', country: 'PE', lat: -12.0464, lng: -77.0428 },

  // More Europe
  { id: 'nl_am', name: 'Amsterdam', country: 'NL', lat: 52.3676, lng: 4.9041 },
  { id: 'se_st', name: 'Stockholm', country: 'SE', lat: 59.3293, lng: 18.0686 },
  { id: 'ru_mo', name: 'Moscow', country: 'RU', lat: 55.7558, lng: 37.6176 },

  // More Asia
  { id: 'in_de', name: 'Delhi', country: 'IN', lat: 28.7041, lng: 77.1025 },
  { id: 'th_bk', name: 'Bangkok', country: 'TH', lat: 13.7563, lng: 100.5018 },
  { id: 'sg_sg', name: 'Singapore', country: 'SG', lat: 1.3521, lng: 103.8198 },
  {
    id: 'hk_hk',
    name: 'Hong Kong',
    country: 'HK',
    lat: 22.3193,
    lng: 114.1694,
  },

  // Middle East & Africa
  { id: 'ae_du', name: 'Dubai', country: 'AE', lat: 25.2048, lng: 55.2708 },
  { id: 'tr_is', name: 'Istanbul', country: 'TR', lat: 41.0082, lng: 28.9784 },
  { id: 'eg_ca', name: 'Cairo', country: 'EG', lat: 30.0444, lng: 31.2357 },
  { id: 'ng_la', name: 'Lagos', country: 'NG', lat: 6.5244, lng: 3.3792 },
  {
    id: 'za_jo',
    name: 'Johannesburg',
    country: 'ZA',
    lat: -26.2041,
    lng: 28.0473,
  },

  // Oceania
  { id: 'au_sy', name: 'Sydney', country: 'AU', lat: -33.8688, lng: 151.2093 },
  {
    id: 'au_me',
    name: 'Melbourne',
    country: 'AU',
    lat: -37.8136,
    lng: 144.9631,
  },
  {
    id: 'nz_au',
    name: 'Auckland',
    country: 'NZ',
    lat: -36.8485,
    lng: 174.7633,
  },
];
