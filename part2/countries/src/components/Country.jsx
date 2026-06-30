import axios from "axios";
import { useEffect, useState } from "react";
const Country = ({ country, detailed, handleShow }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const latitude = country.latlng[0];
  const longitude = country.latlng[1];
  useEffect(() => {
    if (!detailed) {
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [country]);
  if (detailed) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>Weather in {country.capital[0]}</h2>
        {weather ? (
          <>
            <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>Wind {weather.wind.speed} m/s</p>
          </>
        ) : (
          <p>Loading weather...</p>
        )}
      </>
    );
  } else {
    return (
      <div>
        {country.name.common}{" "}
        <button onClick={() => handleShow(country)}>show</button>
      </div>
    );
  }
};
export default Country;
