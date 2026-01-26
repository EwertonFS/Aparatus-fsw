export const queryKeys = {
  getDateAvailableTimeSlots: (barbershopId: string, date?: Date) => [
    "get-date-available-time-slots",
    barbershopId,
    date?.toISOString(),
  ],
};
