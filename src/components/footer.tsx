import { Box, Text, HStack, Link } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      as="footer"
      bg="cyan.800"
      color="white"
      py={3}
      px={6}
      position="fixed"
      bottom="0"
      left="0"
      w="100%"
      textAlign="center"
    >
      <HStack justify="center" gap={6}>
        <Text fontSize="sm">All Right Reserved Weather Dashboard 2025</Text>
        <Link
          href="https://adeel941.github.io/Simple-Portfolio/"
          fontSize="sm"
          color={"white"}
          _hover={{ textDecoration: "underline", color: "white" }}
        >
          About
        </Link>
        <Link
          href="https://adeel941.github.io/Simple-Portfolio/"
          fontSize="sm"
          color={"white"}
          _hover={{ textDecoration: "underline", color: "white" }}
        >
          Contact
        </Link>
      </HStack>
    </Box>
  );
}

export default Footer;
