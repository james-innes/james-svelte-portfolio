import { format, getDate, parseISO } from "date-fns";

export function currency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  }).format(amount);
}

function getOrdinalNum(number: number) {
  let selector;

  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }

  return number + ["th", "st", "nd", "rd", ""][selector];
}

export function formatDate(date: string | Date, formatOption?: "English") {
  const dateObject = typeof date === "string" ? parseISO(date) : date;

  if (formatOption == "English") {
    return format(
      dateObject,
      `EEEE 'the' '${getOrdinalNum(getDate(dateObject))}' 'of' MMMM`
    );
  }
  return format(dateObject, "dd/MM/yy");
}
