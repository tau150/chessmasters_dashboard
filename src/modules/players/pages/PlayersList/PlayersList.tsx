import { useState, useMemo } from "react";
import { VStack, Heading, Box, HStack, Button, Input } from "@chakra-ui/react";
import { useGetPlayers } from "../../hooks/useGetPlayers";
import { useDebounce } from "../../hooks/useDebounce";
import { mapPlayers, sortPlayers } from "./PlayersList.utils";
import { SortType } from "./PlayersList.types";
import { SectionError } from "@/components/SectionError/SectionError";
import { LoadingSection } from "@/components/LoadingSection/LoadingSection";

export const PlayersList = () => {
  const [sortSelection, setSortSelection] = useState(SortType.DESC);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useGetPlayers();

  const debouncedSearchTerm = useDebounce(searchTerm);

  const sortedData = useMemo(() => {
    if (data) {
      const sortedPlayers = sortPlayers(sortSelection, debouncedSearchTerm, data.players);

      return { players: sortedPlayers };
    }
  }, [data, debouncedSearchTerm, sortSelection]);

  if (isError) {
    return <SectionError />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortSelection = (sortType: SortType) => {
    setSortSelection(sortType);
  };

  return (
    <VStack justify="center" mt="12">
      <Heading size="lg">Chess Grandmasters</Heading>
      <Box mt={12} w="100%">
        {isLoading || !sortedData ? (
          <LoadingSection />
        ) : (
          <>
            <HStack justifyContent="center" mb={6}>
              <Button
                colorScheme="teal"
                isActive={sortSelection === SortType.DESC}
                onClick={() => handleSortSelection(SortType.DESC)}
              >
                A-Z
              </Button>
              <Button
                colorScheme="teal"
                isActive={sortSelection === SortType.ASC}
                onClick={() => handleSortSelection(SortType.ASC)}
              >
                Z-A
              </Button>
            </HStack>
            <HStack justifyContent="center" my={8}>
              <Input
                flexBasis="50%"
                placeholder="Search..."
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </HStack>
            <HStack flexWrap="wrap" w="100%">
              {mapPlayers(sortedData.players)}
            </HStack>
          </>
        )}
      </Box>
    </VStack>
  );
};
