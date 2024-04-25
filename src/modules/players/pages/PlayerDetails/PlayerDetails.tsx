import { useParams, Link } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  Heading,
  Text,
  Avatar,
  CardBody,
  HStack,
  Tooltip,
  VStack,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { SlLike } from "react-icons/sl";
import { FaInfoCircle, FaChess, FaExternalLinkAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { TimeCounter } from "./components/TimeCounter/TimeCounter";
import { useGetPlayerDetails } from "@/modules/players/hooks/useGetPlayerDetails";
import { LoadingSection } from "@/components/LoadingSection/LoadingSection";
import { SectionError } from "@/components/SectionError/SectionError";
import { ROUTES } from "@/routes/routes.types";

export const PlayerDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetPlayerDetails(id as string);

  if (isError) {
    return <SectionError />;
  }

  const isVerified = data?.verified;

  return (
    <VStack justifyContent="center" mt={24}>
      <Heading mb={8} size="md">
        Grandmaster Profile
      </Heading>
      {isLoading || !data ? (
        <LoadingSection />
      ) : (
        <Box>
          <Card maxW="md" minW="400px">
            <CardHeader>
              <VStack gap="4">
                <Avatar name={`avatar-${data.name}`} size="xl" src={data.avatar} />
                <VStack>
                  <Heading size="md">{data.username}</Heading>
                  <TimeCounter initialTime={data.last_online} />
                </VStack>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack alignItems="flex-start" gap={6}>
                <Tooltip bg="gray.300" color="black" label="League">
                  <HStack>
                    <Icon as={FaChess} color="purple.400" h={6} w={6} />
                    <Text fontWeight="bold">{data?.league || "No league"}</Text>
                  </HStack>
                </Tooltip>
                <Tooltip bg="gray.300" color="black" label="Followers">
                  <HStack>
                    <Icon as={SlLike} color="blue.400" h={6} w={6} />
                    <Text fontWeight="bold">{data.followers}</Text>
                  </HStack>
                </Tooltip>
                <Tooltip bg="gray.300" color="black" label="Status">
                  <HStack>
                    <Icon as={FaInfoCircle} color="green.300" h={6} w={6} />
                    <Text fontWeight="bold">{data.status}</Text>
                  </HStack>
                </Tooltip>
                <HStack>
                  <Icon
                    as={isVerified ? MdVerified : VscUnverified}
                    color={isVerified ? "green.500" : "orange.500"}
                    h={6}
                    w={6}
                  />
                  <Text fontWeight="bold">{isVerified ? "Verified" : "Unverified"}</Text>
                </HStack>
                <Tooltip bg="gray.300" color="black" label="Profile">
                  <HStack>
                    <Icon as={CgProfile} color={"blue.500"} h={6} w={6} />
                    <ChakraLink isExternal href={data.url}>
                      Profile
                      <Icon as={FaExternalLinkAlt} color={"blue.500"} h={3} ml={4} w={3} />
                    </ChakraLink>
                  </HStack>
                </Tooltip>
              </VStack>
            </CardBody>
          </Card>
          <HStack>
            <Button as={Link} colorScheme="teal" mt={8} mx="auto" size="md" to={ROUTES.ROOT}>
              Go to dashboard
            </Button>
          </HStack>
        </Box>
      )}
    </VStack>
  );
};
