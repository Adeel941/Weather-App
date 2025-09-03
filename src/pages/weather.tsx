import {
  Container,
  Heading,
  Input,
  Stack,
  Button,
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Flex,
  Link
} from "@chakra-ui/react";
 import { Thermometer, Wind, Droplet, Sunrise, Sunset } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import ErrorMessage from "../components/error";
import Loading from "../components/loading";
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
    country:string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { city } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<weatherCity>();
  const user = useUser();


    const getBackgroundImage = (weather: string) => {
    const condition = weather.toLowerCase();
    if (condition.includes("clear")) return "url('/clear.jpg')";
    if (condition.includes("cloud")) return "url('/cloud.jpg')";
    if (condition.includes("rain") || condition.includes("drizzle")) return "url('/rain.jpg')";
    if (condition.includes("snow")) return "url('/snow.jpg')";
    if (condition.includes("thunderstorm")) return "url('/bg.jpg')";
    return "url('/bg.jpg')";
  };

  const onSubmit = (data: weatherCity) => {
    navigate(`/weather/${data.location}`);
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    history.unshift(data.location);
    const unique = [...new Set(history)]; 
    localStorage.setItem("searchHistory", JSON.stringify(unique.slice(0, 5)));
  };
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  console.log(history)

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
        `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${getBackgroundImage(weatherData.weather[0].description)}`
      );
        console.log(weatherData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:string|any) {
        setError(error.message || "Something went wrong");
        setWeatherData(null);
        document.documentElement.style.setProperty(
        "--dynamic-bg",
        `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/bg.jpg')`
      );
        console.log(error);
      }finally {
        setLoading(false); 
      } 
    };
    weather();
  }, [city]);

  return (
    <>
      <Heading p={5} mt={{base:65, md:1 }}>Welcome {user.user?.fullName}</Heading>
        <Container>
          <form action="submit" onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={"column"} align={"center"}>
              <Stack direction={"row"} gap={4} mb={2} justify={"center"}>
                <Input
                  type="text"
                  border={"2px solid"}
                  placeholder="Enter City Name"
                  w={300}
                  {...register("location", { required: true })}
                ></Input>
                <Button type="submit" bg={"whiteAlpha.400"} color={"white"} _hover={{ border: "2px solid white" }}>
                  Get Weather
                </Button>
                
              </Stack>
              <Box display={"flex"} mt={2}>
                <Box display="flex"  gap={3} mb={8} alignContent={"center"}>
                  <Heading size="md" alignSelf={"center"}>Recent Searches:</Heading>
                  {history.map((city: string, index: number) => (
                    <Link key={index} onClick={() => navigate(`/weather/${city}`) } color={"white"} _hover={{color:"cyan.600"}}>{city}</Link>
                  ))}
                </Box>
              </Box>
            </Flex>
          </form>
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {weatherData && !loading && !error && (
          <Flex align={"center"} gap={10} flexDirection={"column"} lg={{flexDirection:"row"}} mb={10} >
            <Card.Root
              bg="whiteAlpha.200"
              color="white"
              borderRadius="2xl"
              p={2}
              textAlign="center"
              shadow="lg"
              w={{base:"90%"}}
              maxW="400px"
              mx="auto"
            >
              <CardHeader>
                <Heading size="lg">{weatherData.name}, {weatherData.sys.country}</Heading>
              </CardHeader>
              <CardBody display={"flex"} flexDirection={"column"} alignItems={"center"} >
                <Heading fontSize="6xl" mb={2} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                  <Thermometer size={60}/>{weatherData.main.temp}°C
                </Heading>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={3}
                >
                  <Text fontSize="xl">
                    {weatherData.weather[0].description}
                  </Text>
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
                    if(exists) {
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

            <SimpleGrid columns={{ base: 2, md: 3, sm:3 }}  gap={4}  h={"100%"} w={"100%"} >
              <Card.Root
                bg="whiteAlpha.200"
                p={2}
                pt={6}
                shadow="lg"
                borderRadius="xl"
                textAlign="center"
              >
                <Text fontWeight="bold" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}> Wind  <Wind/></Text>
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
                md={{w:140}}

              >
                <Text fontWeight="bold" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>Humidity <Droplet/></Text>
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
                md={{w:140}}
              >
                <Text fontWeight="bold" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>Sunrise <Sunrise/></Text>
                <Text>
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}{" "}
                </Text>
                <Text fontWeight="bold" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2} mt={2}>Sunset <Sunset/></Text>
                <Text>
                  {new Date(
                    weatherData.sys.sunset * 1000
                  ).toLocaleTimeString()}
                </Text>
              </Card.Root>
            </SimpleGrid>
          </Flex>
        )}
      </Container>
    </>
  );
}

export default GetWeather;
