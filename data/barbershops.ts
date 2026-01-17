import { prisma } from "@/lib/prisma";

export const getBarbershops = async () => {
  return await prisma.barbershop.findMany();
};

export const getPopularBarbershops = async () => {
  return await prisma.barbershop.findMany({
    take: 10,
    orderBy: {
      name: "desc",
    },
  
  });
};