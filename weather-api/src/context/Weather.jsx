import { createContext, useCallback, useContext, useState } from "react";
import { getWeatherDataForCity } from "../api";
const WeatherContext = createContext(null);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = (props) => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCity = useCallback(async (cityName) => {
    const city = cityName.trim();
    if (!city) {
      setError("Enter a city to search.");
      return;
    }

    setSearchCity(city);
    setLoading(true);
    setError("");
    try {
      setData(await getWeatherDataForCity(city));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = () => fetchCity(searchCity);

  return (
    <WeatherContext.Provider
      value={{
        searchCity,
        data,
        loading,
        error,
        setSearchCity,
        fetchData,
        fetchCity,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};