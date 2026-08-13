import { ChangeEvent, FormEvent, useState } from "react";
import {
  CityResult,
  useCurrentWeather,
  useGeoLocation,
  useGeoSearch,
} from "../api/api";

export default function Weather() {
  const { lat, long } = useGeoLocation();
  const [useGPS, setUseGPS] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { city } = useGeoSearch(search);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const { weather, loading, error, resetWeather } = useCurrentWeather(
    useGPS ? lat : (selectedCity?.latitude ?? 0),
    useGPS ? long : (selectedCity?.longitude ?? 0),
  );

  const weatherEmoji: Record<number, string> = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌦️",
    55: "🌦️",
    56: "🌧️",
    57: "🌧️",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    66: "🌨️",
    67: "🌨️",
    71: "❄️",
    73: "❄️",
    75: "❄️",
    77: "🌨️",
    80: "🌧️",
    81: "🌧️",
    82: "⛈️",
    85: "🌨️",
    86: "🌨️",
    95: "⛈️",
    96: "⛈️",
    99: "⛈️",
  };

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearch(value);
      setShowDropdown(true);
      resetWeather();
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-3xl ">
        <div className="relative">
          <form>
            <label htmlFor="city-search">Search by city: </label>
            <input
              id="city-search"
              type="search"
              autoComplete="off"
              name="search"
              value={query}
              className="border-amber-500 border-2 w-fit"
              onChange={(e) => {
                setQuery(e.target.value);
                setUseGPS(false);
                resetWeather();
                if (e.target.value.length >= 2) {
                  handleSearch(e.target.value);
                }
              }}
            ></input>
            <button
              className="border ml-5 "
              title="Get location from GPS"
              type="button"
              onClick={() => {
                setSelectedCity(null);
                setUseGPS(true);
              }}
            >
              📍
            </button>
          </form>
          <ul
            className={
              showDropdown ? "absolute w-full bg-white border" : "hidden"
            }
          >
            {city?.results &&
              city.results.map((item) => (
                <li
                  className="hover:bg-amber-100 border-b-2"
                  key={item.longitude}
                  onClick={() => {
                    setSelectedCity(item);
                    setShowDropdown(false);
                    setQuery("");
                  }}
                >
                  {item.name + " | " + item.country}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-row text-4xl justify-around mt-8">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {weather && (
          <ul className="flex flex-col gap-15">
            <h2 className="text-5xl text-blue-500 ">Current Weather Rapport</h2>
            <li>
              <p>
                {useGPS
                  ? "Current Location 📍 | " +
                    weather.current_weather.time.slice(11)
                  : `${selectedCity?.name}, ${selectedCity?.country} | ${weather.current_weather.time.slice(11)} `}
              </p>
            </li>
            <li>
              {weather?.current_weather.temperature +
                "°C     " +
                weatherEmoji[weather.current_weather.weathercode]}
            </li>
            <li>{"Wind: " + weather?.current_weather.windspeed + " m/s"}</li>
          </ul>
        )}

        {weather && (
          <ul className="flex flex-col gap-6">
            <h2 className="text-5xl text-blue-500">7 Days Forecast</h2>
            {weather.daily.time.map((day, index) => (
              <li key={day}>{`${day} ${
                weatherEmoji[weather.daily.weathercode[index] ?? "🌡️"]
              } ${weather.daily.temperature_2m_max[index]}°C / ${weather.daily.temperature_2m_min[index]}°C`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
