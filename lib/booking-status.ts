import { isPast, isFuture } from "date-fns";

export const getBookingStatus = (date: Date, cancelledAt: Date | null) => {
  if (cancelledAt) {
    return "cancelled";
  }

  if (isPast(date)) {
    return "finished";
  }

  return "confirmed";
};
