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
      },
    });

    // 2. Gerar a lista completa de horários possíveis (ex: 09:00, 09:30, ...)
    const allTimeSlots = generateDayTimeList(date);

    // 3. Filtrar os horários que já estão ocupados
    const availableTimeSlots = allTimeSlots.filter((time) => {
      // Extrair horas e minutos do slot atual (ex: "09:30")
      const [hours, minutes] = time.split(":").map(Number);
      
      // Verificar se existe algum agendamento com o mesmo horário
      const isOccupied = bookings.some((booking) => {
        return booking.date.getHours() === hours && booking.date.getMinutes() === minutes;
      });

      return !isOccupied;
    });

    return availableTimeSlots;
  });
