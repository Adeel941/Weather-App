
import { SignInButton } from "@clerk/clerk-react";
import {Box, Button, Heading} from "@chakra-ui/react"

function Signin() {
  return (
    <Box textAlign="center" mt={10}>
      <Heading mb={4}>Please Sign In to access Saved Cities</Heading>
      <SignInButton>
        <Button bg={"whiteAlpha.400"} color={"white"}>
          Sign In
        </Button>
      </SignInButton>
    </Box>
  );
}

export default Signin;