"use client";

import { BarbershopService } from "@/generated/prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center gap-3 p-3">
        {/* Imagem */}
        <div className="min-h-[110px ] relative h-[110px] w-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Informações */}
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold">{service.name}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.priceInCents / 100)}
            </p>

            <Button variant="secondary" size="sm" className="rounded-xl">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
