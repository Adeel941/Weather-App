import {Heading, Stack } from "@chakra-ui/react";

interface Props {
  message: string|undefined;
}

function ErrorMessage({ message }: Props) {
  return (
    <Stack textAlign="center" mt={10}>
      <Heading fontSize="xl" color="red.500">
        {message}
      </Heading>
    </Stack>
  );
}

export default ErrorMessage;
