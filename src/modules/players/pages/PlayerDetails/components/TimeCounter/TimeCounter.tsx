import { useState, useEffect } from "react";
import { Text, HStack, Icon, Tooltip } from "@chakra-ui/react";
import { CgSandClock } from "react-icons/cg";
import { getPastTimeValues, formatTimeSection } from "./TimeCounter.utils";

interface Props {
  initialTime: number;
}

export const TimeCounter = ({ initialTime }: Props) => {
  const [time, setTime] = useState(() => getPastTimeValues(initialTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.minutes === 59 && prevTime.seconds === 59) {
          return {
            hours: prevTime.hours + 1,
            minutes: 0,
            seconds: 0,
          };
        } else if (prevTime.seconds === 59) {
          return {
            hours: prevTime.hours,
            minutes: prevTime.minutes + 1,
            seconds: 0,
          };
        } else {
          return {
            hours: prevTime.hours,
            minutes: prevTime.minutes,
            seconds: prevTime.seconds + 1,
          };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <HStack mt={4}>
      <HStack>
        <Text alignItems="center" display="flex" fontWeight="bold" size="sm">
          <Icon as={CgSandClock} color="black.400" h={6} w={6} />
          Time since last online:
        </Text>
        <Tooltip bg="gray.300" color="black" label="Hours, minutes and seconds">
          <Text fontWeight="bold" minW="150px" ml={4} size="sm">
            {formatTimeSection(time.hours, time.minutes, time.seconds)}
          </Text>
        </Tooltip>
      </HStack>
    </HStack>
  );
};
