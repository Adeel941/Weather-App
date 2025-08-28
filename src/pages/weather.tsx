import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}
interface weatherProps {
  location: string;
}

function GetWeather({ location }: weatherProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  useEffect(() => {
    const weather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );
      try {
        const weatherData = await res.json();
        setWeatherData(weatherData);
        console.log(weatherData);
      } catch (error) {
        console.log(error);
      }
    };
    weather();
  }, [location]);

  return (
    <>
      <Heading>Weather App</Heading>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Feels Like: {weatherData.main.feels_like} °C</p>
          <p>Min Temperature: {weatherData.main.temp_min} °C</p>
          <p>Max Temperature: {weatherData.main.temp_max} °C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>
            Sunrise:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            Sunset:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default GetWeather;
