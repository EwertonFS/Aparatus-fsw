"use client";

import { Barbershop, BarbershopService } from "@/generated/prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "@/lib/utils";
import { format } from "date-fns";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourSelect = (time: string) => {
    setHour(time);
  };

  const timeList = useMemo(() => {
    if (!date) return [];
    return generateDayTimeList(date);
  }, [date]);

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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="rounded-xl">
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto p-0 px-0">
                <SheetHeader className="border-b px-5 py-6 text-left">
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="flex w-full justify-center py-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    fromDate={new Date()}
                    locale={ptBR}
                    className="mt-6"
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {/* Horários */}
                {date && (
                  <div className="flex overflow-x-auto border-t border-b px-5 py-6 [&::-webkit-scrollbar]:hidden">
                    <div className="flex gap-3">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => handleHourSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resumo */}
                {date && hour && (
                  <div className="px-5 py-6">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex flex-col gap-2 py-2">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <h3 className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(service.priceInCents / 100)}
                            </h3>
                          </div>

                          {date && (
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm text-gray-400">Data</h3>
                              <h4 className="text-sm">
                                {format(date, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </h4>
                            </div>
                          )}

                          {hour && (
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm text-gray-400">Horário</h3>
                              <h4 className="text-sm">{hour}</h4>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <h3 className="text-sm text-gray-400">Barbearia</h3>
                            <h4 className="text-sm">{barbershop.name}</h4>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="px-5 pb-6">
                  <Button disabled={!hour || !date}>Confirmar</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
