import { Heading, HStack, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <HStack gap={10} justify="center" mt={10}>
      <Spinner size="xl" />
      <Heading>Loading...</Heading>
    </HStack>
  );
}

export default Loading;
