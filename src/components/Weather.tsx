import { ChangeEvent, FormEvent, useState } from "react";
import {
  CityResult,
  useCurrentWeather,
  useGeoLocation,
  useGeoSearch,
} from "../api/WeatherApi";

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
            <label className="font-medium" htmlFor="city-search">
              Search by city:{" "}
            </label>
            <input
              id="city-search"
              type="search"
              autoComplete="off"
              name="search"
              value={query}
              placeholder="Enter city"
              className="placeholder:p-1.5  border-amber-500 border-3 rounded-xl w-fit focus:border-amber-600 focus:outline-none"
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
              className="border-3 ml-5 rounded-2xl border-amber-500 bg-amber-200 "
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
              showDropdown
                ? "absolute w-full bg-white border-3 border-slate-400 rounded-2xl "
                : "hidden"
            }
          >
            {city?.results &&
              city.results.map((item) => (
                <li
                  className="hover:bg-blue-300 bg-none hover:rounded-xl p-1 "
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

      <div className="flex flex-row text-4xl justify-around mt-8 ">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {weather && (
          <ul className="flex flex-col gap-12 bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm">
            <h2 className="text-5xl text-blue-500 ">Current Weather Rapport</h2>
            <li>
              <p className="text-2xl font-bold text-slate-800">
                {useGPS
                  ? "Current Location 📍 | " +
                    weather.current_weather.time.slice(11)
                  : `${selectedCity?.name}, ${selectedCity?.country} | ${weather.current_weather.time.slice(11)} `}
              </p>
            </li>
            <li className="text-6xl font-bold text-slate-900">
              {weather?.current_weather.temperature +
                "°C     " +
                weatherEmoji[weather.current_weather.weathercode]}
            </li>
            <li className="text-2xl font-medium text-slate-700">
              {"Wind: " + weather?.current_weather.windspeed + " m/s"}
            </li>
          </ul>
        )}

        {weather && (
          <ul className="flex flex-col gap-6 bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm">
            <h2 className="text-5xl text-blue-500">7 Days Forecast</h2>
            {weather.daily.time.map((day, index) => (
              <li
                key={day}
              >{`${new Date(day).toLocaleDateString("en-US", { weekday: "short" })} ${
                weatherEmoji[weather.daily.weathercode[index] ?? "🌡️"]
              } ${weather.daily.temperature_2m_max[index]}°C / ${weather.daily.temperature_2m_min[index]}°C`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
