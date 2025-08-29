import { Container, Heading, Input, Stack, Button, Box, HStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { useParams, useNavigate } from "react-router-dom";
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

interface SavedCity {
  name: string;
  temp: number;
  description: string;
  icon: string;
}

function GetWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  // const [location, setLocation] = useState("Lahore");
  const { city } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<weatherCity>();
  const user = useUser();

  // const onSubmit = (data: weatherCity) => {
  //   setLocation(data.location);
  // };

  const onSubmit = (data: weatherCity) => {
    navigate(`/weather/${data.location}`);
  };

  useEffect(() => {
    const weather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
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
  }, [city]);

  return (
    <>
      <Heading p={5}>Welcome {user.user?.fullName}</Heading>
      {weatherData ? (
        <Container>
          <form action="submit" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Input
                type="text"
                border={"2px solid"}
                placeholder="Enter City Name"
                w={300}
                {...register("location", { required: true })}
              ></Input>
              <Button type="submit" bg={"whiteAlpha.300"} color={"white"}>
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
          <Box display={"flex"} alignItems={"center"} gap={3} w={300}>
            <p>Description: {weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          </Box>

          <Button
            mt={4}
            onClick={() => {
              const saved = JSON.parse(
                localStorage.getItem("savedCities") || "[]"
              );

              const exists = saved.some(
                (c: SavedCity) => c.name === weatherData.name
              );
              if (!exists) {
                saved.push({
                  name: weatherData.name,
                  temp: weatherData.main.temp,
                  description: weatherData.weather[0].description,
                  icon: weatherData.weather[0].icon,
                });
                localStorage.setItem("savedCities", JSON.stringify(saved));
              }
            }}
          >
            Save City
          </Button>
        </Container>
      ) : (
        <HStack>
          <Spinner size="xl" />
          <Heading>Loading...</Heading>
        </HStack>
      )}
    </>
  );
}

export default GetWeather;
