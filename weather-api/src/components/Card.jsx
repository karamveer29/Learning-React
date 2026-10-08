import { useWeather } from "../context/Weather";
import { getWeatherDescription, getWeatherSymbol } from "../api";

const Card = () => {
  const { data } = useWeather();
  const currentDate = data.current.time.split("T")[0];
  const forecastDays = data.daily.time
    .map((date, index) => ({ date, index }))
    .filter(({ date }) => date >= currentDate)
    .slice(0, 7);

  return (
    <section className="forecast-section" aria-labelledby="forecast-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE WEEK AHEAD</p>
          <h2 id="forecast-heading">Seven-day forecast</h2>
        </div>
        <span className="section-note">High / low · Rain chance</span>
      </div>
      <div className="forecast-list">
        {forecastDays.map(({ date, index }) => {
          const day = new Date(`${date}T12:00:00`);
          const label = date === currentDate
            ? "Today"
            : new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(day);

          return (
            <article className="forecast-row" key={date}>
              <div className="forecast-day">
                <strong>{label}</strong>
                <span>
                  {new Intl.DateTimeFormat("en-IN", {
                    day: "numeric",
                    month: "short",
                  }).format(day)}
                </span>
              </div>
              <span className="forecast-symbol" aria-hidden="true">
                {getWeatherSymbol(data.daily.weather_code[index])}
              </span>
              <span className="forecast-condition">
                {getWeatherDescription(data.daily.weather_code[index])}
              </span>
              <span className="rain-chance">
                {data.daily.precipitation_probability_max[index] ?? 0}% rain
              </span>
              <div className="forecast-temperatures">
                <strong>{Math.round(data.daily.temperature_2m_max[index])}°</strong>
                <span>{Math.round(data.daily.temperature_2m_min[index])}°</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Card;

