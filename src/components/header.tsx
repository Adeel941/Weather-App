import { HStack, Button, Heading, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/weather.png";
import { SignedIn, SignedOut, SignInButton,  UserButton } from "@clerk/clerk-react";

function Header() {
  return (
    <Flex
      as="header"
      position="fixed" 
      top={0}
      left={0}
      right={0}
      w="100%" 
      p={4}
      align="center"
      justify="space-between"
      zIndex={1000} 
    >
      <Heading  color="white" display="flex" alignItems="center" font={"bold"}>
        <Box _hover={{ transform: "rotate(360deg)", transition: "transform 0.5s"  }} onClick={() => window.location.href = "/weather/Lahore"}cursor="pointer" >
          <img
          src={logo}
          alt="Weather Icon"
          style={{ width: 60, height: 60, marginRight: 10 }}
        />
        </Box>
      </Heading>

      <HStack gap={4}>
        <Link to="/weather/Lahore">
          <Button color={"white"} bg={"whiteAlpha.400"} _hover={{ border: "1px solid white" }}>Home</Button>
        </Link>

        <Link to="/saved">
          <Button color={"white"} bg={"whiteAlpha.400"} _hover={{ border: "1px solid white" }}>Saved</Button>
        </Link>

        <SignedOut>
          <SignInButton>
            <Button color={"white"} bg={"whiteAlpha.400"} _hover={{ border: "1px solid white" }}>Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Box  bg={"whiteAlpha.600"} p={2} pt={3}  borderRadius={"xl"} >
           <UserButton/>
          </Box>
        </SignedIn>

      </HStack>
    </Flex>
  );
}

export default Header;
