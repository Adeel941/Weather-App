import { Container, Heading, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchWeather from "../components/search";
import WeatherCard from "../components/mainCard";
import WeatherDetails from "../components/weatherDetails";
import { useUser } from "@clerk/clerk-react";
import ErrorMessage from "../components/error";
import Loading from "../components/loading";
import { useParams } from "react-router-dom";
import type { WeatherData } from "../types/weather";
const apiKey = import.meta.env.VITE_API_KEY;

function GetWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { city } = useParams();
  const user = useUser();

  const getBackgroundImage = (weather: string) => {
    const condition = weather.toLowerCase();
    if (condition.includes("clear")) return "url('/clear.jpg')";
    if (condition.includes("cloud")) return "url('/cloud.jpg')";
    if (condition.includes("rain") || condition.includes("drizzle"))
      return "url('/rain.jpg')";
    if (condition.includes("snow")) return "url('/snow.jpg')";
    if (condition.includes("thunderstorm")) return "url('/bg.jpg')";
    return "url('/bg.jpg')";
  };

  useEffect(() => {
    const weather = async () => {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      try {
        if (!res.ok) {
          throw new Error("City not found!");
        }
        const weatherData = await res.json();
        setWeatherData(weatherData);
        document.documentElement.style.setProperty(
          "--dynamic-bg",
          `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${getBackgroundImage(
            weatherData.weather[0].description
          )}`
        );
        console.log(weatherData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: string | any) {
        setError(error.message || "Something went wrong");
        setWeatherData(null);
        document.documentElement.style.setProperty(
          "--dynamic-bg",
          `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/bg.jpg')`
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    weather();
  }, [city]);

  return (
    <>
      <Heading p={5} mt={{ base: 65, md: 1 }}>
        Welcome {user.user?.fullName}
      </Heading>
      <Container>
        <SearchWeather />
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {weatherData && !loading && !error && (
          <Flex
            align={"center"}
            gap={10}
            flexDirection={"column"}
            lg={{ flexDirection: "row" }}
            mb={10}
          >
            <WeatherCard weatherData={weatherData} />
            <WeatherDetails weatherData={weatherData} />
          </Flex>
        )}
      </Container>
    </>
  );
}

export default GetWeather;
