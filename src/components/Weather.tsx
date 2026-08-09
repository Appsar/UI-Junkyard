import { FormEvent, useState } from "react";
import { CityResult, useCurrentWeather, useGeoSearch } from "../api/api";

export default function Weather() {
  //const { lat, long } = useGeoLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { lat, long, city } = useGeoSearch(search);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const { weather, loading, error } = useCurrentWeather(
    selectedCity?.latitude ?? 0,
    selectedCity?.longitude ?? 0,
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      (setSearch(query), setShowDropdown(true));
    }
  };

  return (
    <div className="flex flex-col justify-center gap-1 items-center">
      <div className="relative">
        <form onSubmit={handleSearch}>
          <label htmlFor="city-search">Search by city: </label>
          <input
            id="city-search"
            type="search"
            autoComplete="off"
            name="search"
            className="border-amber-500 border-2 w-fit"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button className="px-5 py-2 bg-blue-600" type="submit">
            Search
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
                key={item.longitude}
                onClick={() => {
                  setSelectedCity(item);
                  setShowDropdown(false);
                }}
              >
                {"City: " + item.name + " Country: " + item.country}
              </li>
            ))}
        </ul>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {city && <h2 className="text-3xl text-blue-600 ">Weather Rapport: </h2>}
        {city && (
          <ul>
            <li>
              <p>{`City: ${selectedCity?.name}`}</p>
              <p>{`Country: ${selectedCity?.country}`}</p>
            </li>
            <li>{"Temperature: " + weather?.current_weather.temperature}</li>
            <li>{"Windspeed: " + weather?.current_weather.windspeed}</li>
            <li>{"Weathercode: " + weather?.current_weather.weathercode}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
