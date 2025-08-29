import {
  Container,
  Heading,
  Stack,
  Box,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface SavedCity {
  name: string;
  temp: number;
  description: string;
  icon: string;
}

function Saved() {
  const navigate = useNavigate();
  const savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");

  return (
    <Container p={5}>
      <Heading mb={4}>Saved Cities</Heading>
      <Button
        color={"white"}
        mb={4}
        onClick={() => {
          localStorage.removeItem("savedCities");
          window.location.reload();
        }}
      >
        Clear Saved Cities
      </Button>
      <Stack gap={4}>
        {savedCities.length === 0 ? (
          <Text>No saved cities yet.</Text>
        ) : (
          savedCities.map((city: SavedCity) => (
            <Box
              key={city.name}
              border="1px solid"
              borderRadius="md"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                onClick={() => navigate(`/weather/${city.name}`)}
                cursor="pointer"
              >
                <Heading size="md">{city.name}</Heading>
                <Text>
                  {city.temp}°C - {city.description}
                </Text>
              </Box>
              <Image
                src={`http://openweathermap.org/img/w/${city.icon}.png`}
                alt={city.description}
              />
            </Box>
          ))
        )}
      </Stack>
    </Container>
  );
}

export default Saved;
