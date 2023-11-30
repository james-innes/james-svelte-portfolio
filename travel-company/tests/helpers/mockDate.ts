import {
  addDays,
  subDays,
  addMonths,
  subMonths,
  setHours,
  setMinutes,
  setSeconds,
  formatISO,
} from "date-fns";

function mockDate(dayOffset = 1, monthOffset = 0) {
  const currentDate = new Date();

  const time = 15;
  const withTime = setHours(setMinutes(setSeconds(currentDate, 0), 0), time);

  const withDays =
    dayOffset >= 0
      ? addDays(withTime, dayOffset)
      : subDays(withTime, dayOffset);

  const withMonths =
    monthOffset >= 0
      ? addMonths(withDays, monthOffset)
      : subMonths(withDays, monthOffset);

  return formatISO(withMonths).slice(0, -6) + "+07:00";
}

export default mockDate;
