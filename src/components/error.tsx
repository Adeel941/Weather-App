import {Heading, Stack, Text } from "@chakra-ui/react";

interface Props {
  message: string;
}

function ErrorMessage({ message }: Props) {
  return (
    <Stack textAlign="center" mt={10}>
      <Heading fontSize="xl" color="red.500">
        {message}
      </Heading>
      <Text>Please enter a valid city name.</Text>
    </Stack>
  );
}

export default ErrorMessage;
