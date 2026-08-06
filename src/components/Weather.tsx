import { useState } from "react";
import { useCurrentWeather, useGeoSearch } from "../api/api";

export default function Weather() {
  //const { lat, long } = useGeoLocation();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { lat, long, city } = useGeoSearch(search);
  const { weather, loading, error } = useCurrentWeather(lat, long);

  return (
    <div>
      <h1 className="text-red-500 flex mt-5 justify-center">Weather API</h1>

      <label htmlFor="city-search">Search by city: </label>
      <input
        id="city-search"
        type="search"
        name="search"
        className="border-amber-500 border-2"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button
        onClick={() => {
          setSearch(query);
        }}
      >
        Search
      </button>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {city && (
          <h2 className="text-4xl text-blue-600 ">{city.results[0].name}</h2>
        )}
        {city && (
          <h2 className="text-3xl text-blue-600 ">{city.results[0].country}</h2>
        )}
        {weather && <h3>Temperature: {weather.current_weather.temperature}</h3>}
        {weather && <p>Windspeed: {weather.current_weather.windspeed}</p>}
        {weather && <p>Weathercode: {weather.current_weather.weathercode}</p>}
      </div>
    </div>
  );
}
