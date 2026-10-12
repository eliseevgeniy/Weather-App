import { useEffect, useState } from 'react';
import {
  CurrentWeather,
  GeoResponse,
  CurrentWeatherResponse,
} from '../types/weather';

interface UseCurrentWeatherResult {
  weather: CurrentWeather | null;
  coords: { lat: number; lng: number } | null;
  loading: boolean;
  error: string | null;
}

export const useCurrentWeather = (city: string): UseCurrentWeatherResult => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Геокодинг
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`,
          { signal: controller.signal }
        );
        const geoData: GeoResponse = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error(`Город "${city}" не найден`);
        }

        const { latitude, longitude } = geoData.results[0];
        setCoords({ lat: latitude, lng: longitude });

        // 2. Текущая погода
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=ms`,
          { signal: controller.signal }
        );
        const weatherData: CurrentWeatherResponse = await weatherRes.json();
        setWeather(weatherData.current_weather);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, [city]);

  return { weather, coords, loading, error };
};