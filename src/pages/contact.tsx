import { Box, Input, Textarea, Button, Heading } from "@chakra-ui/react";
import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("meozbjag");

  if (state.succeeded) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="xl" color="white">
          Thanks for your message!
          We will get back to you soon.
        </Heading>
      </Box>
    );
  }

  return (
    <Box maxW="400px" mx="auto" mt={10} p={5} bg={"whiteAlpha.300"} borderRadius={"lg"} border={"2px black"}>
      <Heading size="lg" mb={6} textAlign="center">
        Contact
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          mb={3}
        />
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email"
          mb={1}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <Textarea
          id="message"
          name="message"
          placeholder="Your Message"
          rows={5}
          mb={1}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <Button
          type="submit"
          color="white"
          bg="whiteAlpha.400"
          width="100%"
          _hover={{ border: "1px solid" }}
          mt={3}
        >
          Send
        </Button>
      </form>
    </Box>
  );
}

export default ContactForm;
