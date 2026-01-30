import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100)
}

export function generateDayTimeList(date: Date): string[] {
  const timeList: string[] = [];

  // Gerar horários das 09:00 às 17:30 (Business hours)
  for (let hour = 9; hour <= 17; hour++) {
    for (const minute of ["00", "30"]) {
      // Evita gerar 17:30 se o limite for 17:00
      if (hour === 17 && minute === "30") break;
      timeList.push(`${hour.toString().padStart(2, "0")}:${minute}`);
    }
  }

  return timeList;
}