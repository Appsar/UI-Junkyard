import { useEffect, useState } from "react";

interface WeatherData {
  current_weather: {
    time: string;
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

export interface CityResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface CityData {
  results: CityResult[];
}

export function useGeoSearch(search: string) {
  const [city, setCity] = useState<CityData | null>(null);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${search}`;

  useEffect(() => {
    if (search === "") return;
    async function FetchCity() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Fetch Error");
        }
        const data: CityData = await res.json();
        setCity(data);
        setLat(data.results[0].latitude);
        setLong(data.results[0].longitude);
        if (data.results && data.results.length > 0) {
          setCity(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    FetchCity();
  }, [search]);

  return { lat, long, city };
}

// Get coords from *user*
export function useGeoLocation() {
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLong(position.coords.longitude);
      setLat(position.coords.latitude);
      console.log(position.coords.latitude + " lat");
      console.log(position.coords.longitude + " long");
    });
  }, []);

  return { long, lat };
}

export function useCurrentWeather(lat: number, long: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&timezone=auto&`;
  useEffect(() => {
    if (lat === 0 && long === 0) return;
    setLoading(true);
    async function FetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Fetch Error");
        }
        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log("catch error:", err);
          setError(err.message);
        } else {
          setError("Unexpected Error has occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    FetchData();
  }, [lat, long]);
  const resetWeather = () => setWeather(null);
  return { weather, loading, error, resetWeather };
}
