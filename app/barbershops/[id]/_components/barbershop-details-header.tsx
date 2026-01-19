"use client";

import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Barbershop } from "@/generated/prisma/client";
import MenuSheet from "@/components/menu-sheet";

interface BarbershopDetailsHeaderProps {
  barbershop: Barbershop;
}

const BarbershopDetailsHeader = ({
  barbershop,
}: BarbershopDetailsHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={barbershop.imageUrl}
        fill
        alt={barbershop.name}
        className="object-cover"
      />

      <div className="absolute top-0 left-0 flex w-full items-center justify-between p-5">
        <Button
          variant="outline"
          size="icon"
          className="bg-background rounded-xl border-none shadow-md"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <MenuSheet />
      </div>
    </div>
  );
};

export default BarbershopDetailsHeader;
