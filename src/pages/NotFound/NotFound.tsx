import { VStack, Box, Heading, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes.types";

export const NotFound = () => {
  return (
    <VStack justify="center">
      <Heading color="orange.300">404!</Heading>
      <Heading>Something went wrong</Heading>
      <Text>The page you are looking for does not exist</Text>
      <Box mt="4">
        <Link to={ROUTES.ROOT}>
          <Button colorScheme="orange">Go to home</Button>
        </Link>
      </Box>
    </VStack>
  );
};
