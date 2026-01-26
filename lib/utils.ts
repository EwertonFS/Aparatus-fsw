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
  const startTime = new Date(date);
  startTime.setHours(9, 0, 0, 0);
  const endTime = new Date(date);
  endTime.setHours(17, 0, 0, 0);

  const timeList: string[] = [];
  const currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(
      currentTime.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return timeList;
}