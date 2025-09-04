import { Text, Card, SimpleGrid } from "@chakra-ui/react";
import type { WeatherData } from "../types/weather";
import { Wind, Droplet, Sunrise, Sunset } from "lucide-react";

interface Props {
  weatherData: WeatherData;
}

function WeatherDetails({ weatherData }: Props) {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 3, sm: 3 }}
      gap={4}
      h={"100%"}
      w={"100%"}
    >
      <Card.Root
        bg="whiteAlpha.200"
        p={2}
        pt={6}
        shadow="lg"
        borderRadius="xl"
        textAlign="center"
      >
        <Text
          fontWeight="bold"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          {" "}
          Wind <Wind />
        </Text>
        <Text>{weatherData.wind.speed} m/s</Text>
      </Card.Root>
      <Card.Root
        bg="whiteAlpha.200"
        p={2}
        pt={6}
        shadow="lg"
        borderRadius="xl"
        textAlign="center"
      >
        <Text fontWeight="bold">Feels Like</Text>
        <Text>{weatherData.main.feels_like}°C</Text>
      </Card.Root>
      <Card.Root
        bg="whiteAlpha.200"
        p={2}
        pt={6}
        shadow="lg"
        borderRadius="xl"
        textAlign="center"
        md={{ w: 140 }}
      >
        <Text
          fontWeight="bold"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          Humidity <Droplet />
        </Text>
        <Text>{weatherData.main.humidity}%</Text>
      </Card.Root>
      <Card.Root
        bg="whiteAlpha.200"
        p={2}
        pt={6}
        shadow="lg"
        borderRadius="xl"
        textAlign="center"
      >
        <Text fontWeight="bold">Min Temp</Text>
        <Text>{weatherData.main.temp_min}°C</Text>
      </Card.Root>
      <Card.Root
        bg="whiteAlpha.200"
        p={2}
        pt={6}
        shadow="lg"
        borderRadius="xl"
        textAlign="center"
        h={140}
      >
        <Text fontWeight="bold">Max Temp</Text>
        <Text>{weatherData.main.temp_max}°C</Text>
      </Card.Root>
      <Card.Root
        bg="whiteAlpha.200"
        p={4}
        shadow="lg"
        borderRadius="xl"
        textAlign="center"
        h={140}
        md={{ w: 140 }}
      >
        <Text
          fontWeight="bold"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          Sunrise <Sunrise />
        </Text>
        <Text>
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}{" "}
        </Text>
        <Text
          fontWeight="bold"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          mt={2}
        >
          Sunset <Sunset />
        </Text>
        <Text>
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
        </Text>
      </Card.Root>
    </SimpleGrid>
  );
}

export default WeatherDetails;
