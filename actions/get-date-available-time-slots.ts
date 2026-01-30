"use server";

import { actionClient } from "@/lib/action-client";
import prisma from "@/lib/prisma";
import { generateDayTimeList } from "@/lib/utils";
import { endOfDay, startOfDay } from "date-fns";
import { z } from "zod";

const inputSchema = z.object({
  barbershopId: z.string().uuid(),
  date: z.date(),
});

export const getDateAvailableTimeSlots = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { barbershopId, date } }) => {
    // 1. Buscar todos os agendamentos da barbearia para o dia selecionado
    const bookings = await prisma.booking.findMany({
      where: {
        barbershopId,
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
        cancelledAt:null,
      },
    });

    // 2. Gerar a lista completa de horários possíveis (ex: 09:00, 09:30, ...)
    const allTimeSlots = generateDayTimeList(date);

    // 3. Filtrar os horários que já estão ocupados
    const availableTimeSlots = allTimeSlots.filter((time) => {
      // Verificar se existe algum agendamento com o mesmo horário formatado para Brasília
      const isOccupied = bookings.some((booking) => {
        const bookingTime = booking.date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        });
        return bookingTime === time;
      });

      return !isOccupied;
    });

    return availableTimeSlots;
  }); 
