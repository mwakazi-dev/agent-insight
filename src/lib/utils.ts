import dayjs from "dayjs";

/**
 * Formats a Day.js date object to a readable string.
 * @param date - The Day.js date object to format.
 * @returns A formatted date string or a message if date is null.
 */
export const formatDate = (date: dayjs.Dayjs | null): string => {
  if (date) {
    return date.format("YYYY-MM-DD HH:mm:ss");
  } else {
  }
  return "Date is not selected";
};
