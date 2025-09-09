import { Text, Card, SimpleGrid, Box } from "@chakra-ui/react";
import type { forecastData } from "../types/weather";
 import { Thermometer} from "lucide-react";

interface Props {
  forecastData: forecastData;
}

function timeConv(time: number) {
  return new Date(time * 1000).toLocaleTimeString();
}

function ForecastDetails({ forecastData }: Props) {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 3, sm: 3 }}
      gap={6}
      h={"100%"}
      w={"100%"}
    >
      {forecastData.list.slice(0, 9).map((item) => (
        <Card.Root
          bg="whiteAlpha.200"
          p={2}
          pt={6}
          shadow="lg"
          _hover={{scale:1.1, transition: "all 0.5s" , shadow:"xl"}}
          borderRadius="xl"
          textAlign="center"
          display={"flex"}
          flexDirection={"column"}
          key={item.dt}
        >
          <Text>Time: {timeConv(item.dt)}</Text>
          <Text display={"flex"} gap={2} justifyContent={"Center"} mt={2} fontSize={"lg"}><Thermometer/>{item.main.temp} °C</Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={3}
            flex={"wrap"}
          >
            <Text>{item.weather[0].description}</Text>
            <img
              src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
          </Box>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}

export default ForecastDetails;
