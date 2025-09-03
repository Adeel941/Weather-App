import {
  Container,
  Heading,
  Box,
  Text,
  Image,
  Button,
  Wrap,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../App.css"

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
    <Container p={5} id="root">
      <Heading mb={4} fontSize={25} >Saved Cities</Heading>
      <Button
        bg={"whiteAlpha.400"} 
        color={"white"}
        mb={4}
        _hover={{ border: "1px solid white" }}
        onClick={() => {
          localStorage.removeItem("savedCities");
          window.location.reload();
        }}
      >
        Clear Saved Cities
      </Button>
      <Wrap gap={4} justify={"center"} >
        {savedCities.length === 0 ? (
          <Text>No saved cities yet.</Text>
        ) : (
          savedCities.map((city: SavedCity) => (
            <Box
              key={city.name}
              border="1px solid"
              borderRadius="md"
              bg={"whiteAlpha.200"}
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
      </Wrap>
    </Container>
  );
}

export default Saved;
