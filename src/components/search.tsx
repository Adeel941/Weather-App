import {
  Heading,
  Input,
  Stack,
  Button,
  Box,
  Flex,
  Link,
} from "@chakra-ui/react";
import type { weatherCity } from "../types/weather";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SearchWeather() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<weatherCity>();

  const onSubmit = (data: weatherCity) => {
    navigate(`/weather/${data.location}`);
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    history.unshift(data.location);
    const unique = [...new Set(history)];
    localStorage.setItem("searchHistory", JSON.stringify(unique.slice(0, 5)));
  };
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  console.log(history);

  return (
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
          <Button
            type="submit"
            bg={"whiteAlpha.400"}
            color={"white"}
            _hover={{ border: "2px solid white" }}
          >
            Get Weather
          </Button>
        </Stack>
        <Box display={"flex"} mt={2}>
          <Box display="flex" gap={3} mb={8} alignContent={"center"}>
            <Heading size="md" alignSelf={"center"}>
              Recent Searches:
            </Heading>
            {history.map((city: string, index: number) => (
              <Link
                key={index}
                onClick={() => navigate(`/weather/${city}`)}
                color={"white"}
                _hover={{ color: "cyan.600" }}
              >
                {city}
              </Link>
            ))}
          </Box>
        </Box>
      </Flex>
    </form>
  );
}

export default SearchWeather;
