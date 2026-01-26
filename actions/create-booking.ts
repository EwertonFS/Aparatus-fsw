"use server"; // don't forget to add this!

import { z } from "zod";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/action-client";
import prisma from "@/lib/prisma";
import auth from "@/lib/auth";
//session cookies
import { headers } from "next/headers";

// This schema is used to validate input from client.
const inputSchema = z.object({
  serviceId: z.uuid(),
  date:z.date(),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId,date} }) => {

  
   
    const session = await auth.api.getSession({
        headers:await headers()
    })


     //Ususario esta logado?
    if(!session?.user){
        return returnValidationErrors(inputSchema, { _errors: ["Usuário não autenticado"] });
    }

    const service = await prisma.barbershopService.findUnique({
        where:{
            id:serviceId
        }
    })

    //serviço existe?

    if(!service){
        return returnValidationErrors(inputSchema, { _errors: ["Serviço não encontrado"] });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    
    
    //Já existe agendamento?
    if (existingBooking) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Data e hora selecionadas já estão agendadas."],
      });
    }
    
    const booking = await prisma.booking.create({
        data:{
            serviceId,
            date,
            userId:session.user.id,
            barbershopId:service.barbershopId,
        }
    })

    return booking;
 
  })