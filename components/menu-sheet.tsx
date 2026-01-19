"use client";

import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MenuIcon,
  HomeIcon,
  CalendarDaysIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

// REQUISITO: Mock de autenticação (Strict Mode)
// const isLogged = false; utilizando no momento desenvolvimento.

const categories = [
  { label: "Cabelo", search: "Cabelo" },
  { label: "Barba", search: "Barba" },
  { label: "Acabamento", search: "Acabamento" },
  { label: "Sobrancelha", search: "Sobrancelha" },
  { label: "Massagem", search: "Massagem" },
  { label: "Hidratação", search: "Hidratação" },
];

const MenuSheet = () => {
  const { data: session } = authClient.useSession();

  const handleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const isLogged = !!session?.user;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="border-border border-b px-5 py-6 text-left">
          <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6">
          {/* SEÇÃO LOGIN / USER INFO (REQUISITO 🔐) */}
          <div className="px-5">
            {isLogged ? (
              <div className="flex items-center gap-3">
                <Avatar className="border-primary size-10 border-2">
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">
                    {session?.user?.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-bold">Olá. Faça seu login!</p>
                  <Button
                    className="gap-2 rounded-xl px-4 py-2 text-sm font-bold"
                    onClick={handleLogin}
                  >
                    Login
                    <LogInIcon className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator className="mx-0" />

          {/* NAVEGAÇÃO PRINCIPAL (🔗) */}
          <div className="flex flex-col gap-1">
            <SheetClose asChild>
              <Link
                href="/"
                className="hover:bg-accent flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors"
              >
                <HomeIcon className="size-4" />
                Início
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/bookings"
                className="hover:bg-accent flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors"
              >
                <CalendarDaysIcon className="size-4" />
                Agendamentos
              </Link>
            </SheetClose>
          </div>

          <Separator className="mx-0" />

          {/* CATEGORIAS (🔗 REQUISITO: IDENTAÇÃO) */}
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground px-5 py-2 text-xs font-bold uppercase">
              Categorias
            </p>
            {categories.map((category) => (
              <SheetClose key={category.search} asChild>
                <Link
                  href={`/barbershops?search=${category.search}`}
                  className="hover:bg-accent flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors"
                >
                  <div className="w-4" />{" "}
                  {/* Espaço reservado para alinhar com os ícones acima */}
                  {category.label}
                </Link>
              </SheetClose>
            ))}
          </div>

          {/* RODAPÉ / SAIR */}
          {isLogged && (
            <>
              <Separator className="mx-0" />
              <div className="mt-auto px-5 py-6">
                <Button
                  variant="ghost"
                  className="hover:bg-accent flex w-full items-center justify-start gap-3 px-0 text-sm font-medium transition-colors"
                  disabled={false}
                  onClick={handleLogout}
                >
                  <LogOutIcon className="size-4" />
                  Sair da conta
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
