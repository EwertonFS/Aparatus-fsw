import { createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";
import { auth } from "./auth";

// Cliente base para ações que não exigem autenticação Middleware
export const actionClient = createSafeActionClient();

// Cliente para ações que EXIGEM que o usuário esteja logado.
// Ele verifica a sessão automaticamente e injeta o usuário no contexto (ctx).
export const protectedActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Não autorizado. Por favor, faça login para continuar.");
  }

  // Retorna o próximo passo da ação, passando o usuário autenticado no contexto
  return next({ ctx: { user: session.user } });
});