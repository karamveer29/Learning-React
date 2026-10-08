import { useWeather } from "../context/Weather";

const Input = () => {
    const weather = useWeather();

    return (
        <input
            aria-label="Search an Indian city"
            autoComplete="off"
            className="input-field"
            placeholder="Search a city in India"
            value={weather.searchCity}
            onChange={(event) => weather.setSearchCity(event.target.value)}
        />
    );
};

export default Input;
