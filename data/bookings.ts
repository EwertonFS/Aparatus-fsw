import { Barbershop, BarbershopService } from "@/generated/prisma/client";

// This is a temporary type until we have the Booking model in Prisma
export interface BookingWithRelations {
  id: string;
  date: Date;
  cancelledAt: Date | null;
  barbershop: Barbershop;
  service: BarbershopService;
}
