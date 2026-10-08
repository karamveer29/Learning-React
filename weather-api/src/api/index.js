const geocodingURL = "https://geocoding-api.open-meteo.com/v1/search";
const forecastURL = "https://api.open-meteo.com/v1/forecast";

const getJSON = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.reason || "Weather data is temporarily unavailable.");
  }

  return data;
};

const getForecast = (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "Asia/Kolkata",
    forecast_days: "8",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
  });

  return getJSON(`${forecastURL}?${params}`);
};

export const getWeatherDataForCity = async (city) => {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json",
    countryCode: "IN",
  });
  const results = await getJSON(`${geocodingURL}?${params}`);
  const location = results.results?.[0];

  if (!location) {
    throw new Error(`No Indian city found for "${city}".`);
  }

  const forecast = await getForecast(location.latitude, location.longitude);
  return {
    location: {
      name: location.name,
      region: location.admin1,
      country: location.country,
    },
    ...forecast,
  };
};

export const getWeatherDescription = (code) => {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Conditions unavailable";
};

export const getWeatherSymbol = (code) => {
  if (code === 0 || code === 1) return "☀";
  if (code === 2) return "◒";
  if ([45, 48, 3].includes(code)) return "☁";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄";
  if ([95, 96, 99].includes(code)) return "ϟ";
  return "☂";
};