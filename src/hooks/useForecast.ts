import { useEffect, useState } from 'react';
import { DailyForecast, ForecastResponse } from '../types/weather';

interface UseForecastResult {
  forecast: DailyForecast | null;
  loading: boolean;
  error: string | null;
}

export const useForecast = (
  lat: number,
  lng: number
): UseForecastResult => {
  const [forecast, setForecast] = useState<DailyForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchForecast = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`,
          { signal: controller.signal }
        );
        const data: ForecastResponse = await res.json();
        setForecast(data.daily);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();

    return () => controller.abort();
  }, [lat, lng]);

  return { forecast, loading, error };
};