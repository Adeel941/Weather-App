import { Container, Heading, Input, Stack, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

interface weatherCity {
  location: string;
}

function GetWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("Lahore");
  const { register, handleSubmit } = useForm<weatherCity>();

  const onSubmit = (data: weatherCity) => {
    setLocation(data.location);
  };

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
      <Heading p={5}>Weather App</Heading>
      {weatherData ? (
        <Container>
          <form action="submit" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Input
                type="text"
                border={"1px solid"}
                placeholder="Enter City Name"
                w={300}
                {...register("location", { required: true })}
              ></Input>
              <Button type="submit" bg={"whiteAlpha.300"}>
                Get Weather
              </Button>
            </Stack>
          </form>
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
          <Box display={"flex"} justifyContent={"center"} gap={3}>
            <p>Description: {weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          </Box>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default GetWeather;
