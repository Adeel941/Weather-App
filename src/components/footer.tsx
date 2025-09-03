import { Box, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
          color={"white"}
          to="/about"
        >
          About
        </Link>
        <Link
          to="/contact"
          color={"white"}
        >
          Contact
        </Link>
      </HStack>
    </Box>
  );
}

export default Footer;
