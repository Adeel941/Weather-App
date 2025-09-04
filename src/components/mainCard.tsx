import {
  Heading,
  Button,
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { Thermometer } from "lucide-react";
import type { WeatherData, SavedCity } from "../types/weather";

interface Props {
  weatherData: WeatherData;
}

function WeatherCard({ weatherData }: Props) {
  return (
    <Card.Root
      bg="whiteAlpha.200"
      color="white"
      borderRadius="2xl"
      p={2}
      textAlign="center"
      shadow="lg"
      w={{ base: "90%" }}
      maxW="400px"
      mx="auto"
    >
      <CardHeader>
        <Heading size="lg">
          {weatherData.name}, {weatherData.sys.country}
        </Heading>
      </CardHeader>
      <CardBody display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Heading
          fontSize="6xl"
          mb={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
        >
          <Thermometer size={60} />
          {weatherData.main.temp}°C
        </Heading>
        <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
          <Text fontSize="xl">{weatherData.weather[0].description}</Text>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </Box>
        <Button
          my={6}
          bg={"whiteAlpha.400"}
          _hover={{ border: "1px solid white" }}
          color={"white"}
          w={"60%"}
          onClick={() => {
            const saved = JSON.parse(
              localStorage.getItem("savedCities") || "[]"
            );
            const exists = saved.some(
              (c: SavedCity) => c.name === weatherData.name
            );
            if (exists) {
              alert("City already saved!");
            }
            if (!exists) {
              saved.push({
                name: weatherData.name,
                temp: weatherData.main.temp,
                description: weatherData.weather[0].description,
                icon: weatherData.weather[0].icon,
              });
              localStorage.setItem("savedCities", JSON.stringify(saved));
              alert("City saved!");
            }
          }}
        >
          Save City
        </Button>
      </CardBody>
    </Card.Root>
  );
}

export default WeatherCard;
