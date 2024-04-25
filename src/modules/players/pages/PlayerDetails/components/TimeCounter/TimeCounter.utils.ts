interface GetPastTimeValuesReturn {
  hours: number;
  minutes: number;
  seconds: number;
}

const getLastDateAndTime = (timestamp: number): Date => {
  const timeInMilliSeconds = timestamp * 1000;
  const currentDateTimestamp = new Date().getTime();
  const diff = currentDateTimestamp - timeInMilliSeconds;

  return new Date(currentDateTimestamp - diff);
};

export const getPastTimeValues = (timestamp: number): GetPastTimeValuesReturn => {
  const lastTimeOnlineDate = getLastDateAndTime(timestamp);
  const currentDate = new Date().getTime();

  const diffInMilliseconds = Number(currentDate) - Number(lastTimeOnlineDate);

  let seconds = Math.floor(diffInMilliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return { hours, minutes, seconds };
};

export const formatTimeSection = (hours: number, minutes: number, seconds: number): string => {
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
};
