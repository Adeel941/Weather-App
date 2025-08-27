import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

function GetWeather() {
  useEffect(() => {
    const weather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Lahore&units=metric&appid=${apiKey}`
      );
      try {
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    weather();
  }, []);

  return <Heading>Weather Update comming soon</Heading>;
}

export default GetWeather;
