import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Prisma } from "@/generated/prisma/client";

export type BookingWithRelations = Prisma.BookingGetPayload<{
  include: { barbershop: true; service: true };
}>;

export const getUserBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return { confirmedBookings: [], finishedBookings: [] };
  }
  const now = new Date();

  // Executa ambas as consultas em paralelo para ganhar performance
  const [confirmedBookings, finishedBookings] = await Promise.all([
    // Busca agendamentos futuros que não foram cancelados
    prisma.booking.findMany({
      where: {
        userId: session.user.id,
        date: { gte: now },
        cancelledAt: null,
      },
      include: {
        barbershop: true,
        service: true,
      },
      orderBy: { date: "asc" },
    }),
    // Busca agendamentos passados OU agendamentos que foram cancelados
    prisma.booking.findMany({
      where: {
        userId: session.user.id,
        OR: [{ date: { lt: now } }, { cancelledAt: { not: null } }],
      },
      include: {
        barbershop: true,
        service: true,
      },
      orderBy: { date: "desc" },
    }),
  ]);

  return { confirmedBookings, finishedBookings };
};