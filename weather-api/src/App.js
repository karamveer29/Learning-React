import { useEffect } from "react";
import Card from "./components/Card";
import Input from "./components/Input";
import Button from "./components/Button";
import { useWeather } from "./context/Weather";
import { getWeatherDescription, getWeatherSymbol } from "./api";

import "./App.css";

const popularCities = ["Mumbai", "Bengaluru", "Chennai", "Kolkata", "Jaipur", "Hyderabad"];

function App() {
  const weather = useWeather();
  const { data, error, fetchCity, fetchData, loading, searchCity } = weather;

  useEffect(() => {
    fetchCity("Delhi");
  }, [fetchCity]);

  const current = data?.current;

  return (
    <div className="App">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="India Weather home">
          <span className="wordmark-icon" aria-hidden="true">I</span>
          <span>INDIA<span className="wordmark-light">/WEATHER</span></span>
        </a>
        <div className="edition-label"><span /> INDIA EDITION</div>
      </header>

      <main id="top" className="page-content">
        <section className="intro-row">
          <div className="intro-copy">
            <p className="eyebrow">YOUR DAILY WEATHER BRIEFING</p>
            <h1>India, <em>outside.</em></h1>
            <p className="intro-description">
              Local conditions and a seven-day outlook, wherever the day takes you.
            </p>
          </div>
          <form
            className="search-form"
            onSubmit={(event) => {
              event.preventDefault();
              fetchData();
            }}
          >
            <Input />
            <Button disabled={loading} type="submit" value={loading ? "Searching" : "Search"} />
          </form>
        </section>

        <nav className="city-nav" aria-label="Popular Indian cities">
          <span className="city-nav-label">EXPLORE</span>
          <button
            className={`city-link ${searchCity.toLowerCase() === "delhi" ? "active" : ""}`}
            onClick={() => fetchCity("Delhi")}
            type="button"
          >Delhi</button>
          {popularCities.map((city) => (
            <button
              className={`city-link ${searchCity.toLowerCase() === city.toLowerCase() ? "active" : ""}`}
              key={city}
              onClick={() => fetchCity(city)}
              type="button"
            >
              {city}
            </button>
          ))}
        </nav>

        {loading && <p className="notice" role="status">Gathering the latest conditions…</p>}
        {error && <p className="notice error-notice" role="alert">{error}</p>}

        {data && current && (
          <>
            <section className="current-panel" aria-label="Current weather">
              <div className="current-heading">
                <div>
                  <p className="eyebrow">CURRENT CONDITIONS</p>
                  <h2>{data.location.name}<span>, {data.location.region}</span></h2>
                  <p className="local-time">{data.location.country} <span>·</span> {current.time.split("T")[1]} local time</p>
                </div>
                <span className="live-indicator"><span /> LIVE</span>
              </div>

              <div className="current-details">
                <div className="temperature-block">
                  <span className="condition-symbol" aria-hidden="true">
                    {getWeatherSymbol(current.weather_code)}
                  </span>
                  <div>
                    <p className="condition-name">{getWeatherDescription(current.weather_code)}</p>
                    <p className="temperature">{Math.round(current.temperature_2m)}<span>°</span></p>
                  </div>
                </div>

                <dl className="weather-stats">
                  <div><dt>FEELS LIKE</dt><dd>{Math.round(current.apparent_temperature)}°</dd></div>
                  <div><dt>HUMIDITY</dt><dd>{current.relative_humidity_2m}%</dd></div>
                  <div><dt>WIND</dt><dd>{Math.round(current.wind_speed_10m)} <small>km/h</small></dd></div>
                  <div><dt>PRECIPITATION</dt><dd>{current.precipitation} <small>mm</small></dd></div>
                </dl>
              </div>
              <div className="panel-footer">
                <span>Forecast updated for {data.timezone.replaceAll("_", " ")}</span>
                <span>Temperatures in °C</span>
              </div>
            </section>

            <Card />
          </>
        )}

        <footer className="source-note">
          <span>WEATHER DATA · OPEN-METEO</span>
          <span>Indian locations · India Standard Time</span>
        </footer>
      </main>
    </div>
  );
}

export default App;