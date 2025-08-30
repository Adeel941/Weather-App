import { Box, Heading } from "@chakra-ui/react";

interface Props {
  message: string;
}

function ErrorMessage({ message }: Props) {
  return (
    <Box textAlign="center" mt={10}>
      <Heading fontSize="xl" color="red.500">
        {message}
      </Heading>
    </Box>
  );
}

export default ErrorMessage;
