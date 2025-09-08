import { Stack, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Stack>
      <Heading fontSize="2xl"> Page Not Found</Heading>
      <Text fontSize="large">
        Please insert correct Url or navigate to <Link to="/">Home</Link>
      </Text>
    </Stack>
  );
}

export default NotFound;
