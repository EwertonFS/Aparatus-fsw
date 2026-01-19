"use client";

import { MapPinIcon } from "lucide-react";
import { Barbershop } from "@/generated/prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  return (
    <div className="border-border bg-background relative z-10 -mt-4 flex items-center gap-4 rounded-t-3xl border-b px-5 py-6">
      <Avatar className="border-primary size-16 rounded-full border-2">
        <AvatarImage
          src={barbershop.imageUrl}
          alt={barbershop.name}
          className="object-cover"
        />
        <AvatarFallback>{barbershop.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-2">
          <MapPinIcon className="text-primary size-4" />
          <p className="text-sm">{barbershop.address}</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
