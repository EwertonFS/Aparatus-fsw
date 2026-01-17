"use client";

import { Hand, Brush, Scissors, Sparkles } from "lucide-react";
import { PageSectionScroller } from "./page";
import Link from "next/link";

const QuickSearch = () => {
  return (
    <PageSectionScroller>
      <Link
        href="/barbershops?search=Cabelo"
        className="bg-secondary hover:bg-accent flex flex-none items-center justify-center gap-3 rounded-full border px-4 py-3 transition-colors"
      >
        <Scissors className="size-4" />
        <span className="text-foreground text-sm font-medium">Cabelo</span>
      </Link>
      <Link
        href="/barbershops?search=Barba"
        className="bg-secondary hover:bg-accent flex flex-none items-center justify-center gap-3 rounded-full border px-4 py-3 transition-colors"
      >
        <Brush className="size-4" />
        <span className="text-foreground text-sm font-medium">Barba</span>
      </Link>
      <Link
        href="/barbershops?search=Acabamento"
        className="bg-secondary hover:bg-accent flex flex-none items-center justify-center gap-3 rounded-full border px-4 py-3 transition-colors"
      >
        <Sparkles className="size-4" />
        <span className="text-foreground text-sm font-medium">Acabamento</span>
      </Link>
      <Link
        href="/barbershops?search=Massagem"
        className="bg-secondary hover:bg-accent flex flex-none items-center justify-center gap-3 rounded-full border px-4 py-3 transition-colors"
      >
        <Hand className="size-4" />
        <span className="text-foreground text-sm font-medium">Massagem</span>
      </Link>
    </PageSectionScroller>
  );
};

export default QuickSearch;
