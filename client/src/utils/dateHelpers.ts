import {
  formatDuration,
  intervalToDuration,
  formatISO,
  formatISO9075
} from "date-fns";

export function getDurationStringFromInt(int: number, format: string[]) {
  return formatDuration(
    intervalToDuration({
      start: 0,
      end: int
    }),
    { format: format }
  );
}

export function getDateStringFromDate(date: Date) {
  return formatISO(date, {
    representation: "date"
  });
}

export function getTimeString(ms: number) {
  const actualSpentTimeInterval = intervalToDuration({
    start: 0,
    end: ms
  });
  const { hours, minutes, seconds } = actualSpentTimeInterval;

  return formatISO9075(new Date(0, 0, 0, hours, minutes, seconds), {
    representation: "time"
  });
}
