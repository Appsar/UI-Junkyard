import { ChangeEvent, FormEvent, useState } from "react";
import { CityResult, useCurrentWeather, useGeoSearch } from "../api/api";

export default function Weather() {
  //const { lat, long } = useGeoLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { city } = useGeoSearch(search);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const { weather, loading, error } = useCurrentWeather(
    selectedCity?.latitude ?? 0,
    selectedCity?.longitude ?? 0,
  );

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearch(value);
      setShowDropdown(true);
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
                if (e.target.value.length >= 2) {
                  handleSearch(e.target.value);
                }
              }}
            ></input>
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
                    setQuery("");
                  }}
                >
                  {item.name + " | " + item.country}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="flex ml-[4%] flex-col text-4xl gap-10">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {city && (
          <h2 className="text-5xl text-blue-500 ">Current Weather Rapport: </h2>
        )}
        {city && (
          <ul className="flex flex-col gap-15">
            <li>
              <p>{`${selectedCity?.name}, ${selectedCity?.country}`}</p>
            </li>
            <li>
              {"Temperature: " + weather?.current_weather.temperature + "°C"}
            </li>
            <li>
              {"Windspeed: " + weather?.current_weather.windspeed + " m/s"}
            </li>
            <li>{"Weathercode: " + weather?.current_weather.weathercode}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
