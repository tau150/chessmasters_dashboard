import { VStack, Spinner, Heading } from "@chakra-ui/react";

export const LoadingSection = () => {
  return (
    <VStack data-testid="loading-section" justify="center">
      <Spinner color="orange.300" size="xl" />
      <Heading color="orange.300" mt="4" size="lg">
        Loading...
      </Heading>
    </VStack>
  );
};
