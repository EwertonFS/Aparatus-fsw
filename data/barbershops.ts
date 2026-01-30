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

export const getBarbershopById = async (id: string) => {
  return await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });
};

export const searchBarbershops = async (search: string) => {
  return await prisma.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  });
};
