import { VStack, Heading, Box, HStack } from "@chakra-ui/react";
import { useGetPlayers } from "../../hooks/useGetPlayers";
import { mapPlayers } from "./PlayerList.utils";
import { SectionError } from "@/components/SectionError/SectionError";
import { LoadingSection } from "@/components/LoadingSection/LoadingSection";

export const PlayersList = () => {
  const { data, isLoading, isError } = useGetPlayers();

  if (isError) {
    return <SectionError />;
  }

  return (
    <VStack justify="center" mt="12">
      <Heading size="lg">Chess Grandmasters</Heading>
      <Box mt={12} w="100%">
        {isLoading || !data ? (
          <LoadingSection />
        ) : (
          <HStack flexWrap="wrap" justifyContent="space-between" w="100%">
            {mapPlayers(data.players)}
          </HStack>
        )}
      </Box>
    </VStack>
  );
};
