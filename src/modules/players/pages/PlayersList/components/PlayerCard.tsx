import { memo } from "react";
import { Box, Card, CardBody } from "@chakra-ui/react";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "@/routes/routes.types";

interface Props {
  player: string;
}

export const PlayerCard = memo(({ player }: Props) => {
  return (
    <Card
      key={player}
      as={Link}
      flexBasis="23%"
      mt={4}
      to={generatePath(ROUTES.MASTER_PROFILE, { id: player })}
    >
      <Box bg="orange.200" borderTopRadius="10px" h="10px" />
      <CardBody>{player}</CardBody>
    </Card>
  );
});

PlayerCard.displayName = "PlayerCard";
