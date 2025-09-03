import { Container, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function About() {
  return (
    <Container maxW="600px" mt={10} textAlign="center">
      <Heading mb={4}>About This App</Heading>
      <Text fontSize="lg" color="white.200">
        This is a simple weather application built with React, Vite, and Chakra
        UI. It allows users to search for cities, view real-time weather data,
        and save favorite locations. Authentication is handled using Clerk, and 
        forms are powered by Formspree. You Got and Queries then please feel free to {" "}
        <Link to="/contact" style={{textDecoration:"underline", color:"cyan"}}>Contact</Link>{" "} me.
      </Text>
    </Container>
  );
}

export default About;
