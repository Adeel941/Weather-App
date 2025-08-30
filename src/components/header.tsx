import { HStack, Button, Heading, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/weather.png";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";

function Header() {
  return (
    <Flex
      as="header"
      position="fixed" 
      top={0}
      left={0}
      right={0}
      w="100%" 
      bg="cyan.700"
      p={4}
      align="center"
      justify="space-between"
      zIndex={1000} 
    >
      <Heading size="xl" color="white" display="flex" alignItems="center" font={"bold"}>
        <img
          src={logo}
          alt="Weather Icon"
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        Weather Dashboard
      </Heading>

      <HStack gap={4}>
        <Link to="/weather/Lahore">
          <Button color={"white"}>Home</Button>
        </Link>

        <Link to="/saved">
          <Button color={"white"}>Saved</Button>
        </Link>

        <SignedOut>
          <SignInButton>
            <Button color="white" >Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <SignOutButton>
            <Button color="white" >Sign Out</Button>
          </SignOutButton>
        </SignedIn>

      </HStack>
    </Flex>
  );
}

export default Header;
