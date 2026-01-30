import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, tool, stepCountIs, UIMessage } from "ai";
import z, { uuid } from "zod";
import { prisma } from "@/lib/prisma";
import { getDateAvailableTimeSlots } from "@/actions/get-date-available-time-slots";
import { createBooking } from "@/actions/create-booking";

export const maxDuration = 30; // Evitar timeout em serverless

const tools = {
  searchBarbershops: tool({
    description: "Pesquisa barbearias pelo nome .Se nenhum nome for informado, retorna todas as barbearias.",
    inputSchema: z.object({
      name: z.string().optional().describe("Nome da barbearia a ser pesquisada. Se nenhum nome é passado , retorna toas as barbearias")
    }),
    //  execute: async ({ name }) => {
    //       console.log("searchBarbershops", name);
    //       if (!name?.trim()) {
    //         const barbershops = await prisma.barbershop.findMany({
    //           include: {
    //             services: true,
    //           },
    //         });
    //         return barbershops;
    //       }
    //       const barbershops = await prisma.barbershop.findMany({
    //         where: {
    //           name: {
    //             contains: name,
    //             mode: "insensitive",
    //           },
    //         },
    //         include: {
    //           services: true,
    //         },
    //       });
    //       return barbershops;
    //     },
    execute: async ({ name }) => {
      try {
        const where = name ? { name: { contains: name, mode: "insensitive" as const } } : {};
        const barbershops = await prisma.barbershop.findMany({
          where,
          take: name ? undefined : 5,
          include: { services: !!name }
        });
        if (barbershops.length === 0) {
          return "Nenhuma barbearia encontrada.";
        }
        return barbershops.map(b => 
          `- ${b.name}: ${b.address}${(b as { services?: { name: string; priceInCents: number; id: string }[] }).services ? ` (Serviços: ${(b as { services: { name: string; priceInCents: number; id: string }[] }).services.map(s => `${s.name} [ID: ${s.id}] R$${(s.priceInCents / 100).toFixed(2)}`).join(', ')})` : ''}`
        ).join('\n');
      } catch (error) {
        console.error("Erro na Tool searchBarbershops:", error);
        return "Erro ao buscar barbearias.";
      }
    },
  }),
  getAvailableTimeSlotsForBarbershop: tool({
    description: "Obtém os horários disponíveis para uma barbearia específica.",
    inputSchema: z.object({
      barbershopId: z.string().describe("O ID da barbearia"),
      date: z.string().describe("A data no formato YYYY-MM-DD")
    }),
    execute: async ({ barbershopId, date }) => {
      try {
        // Adicionar T00:00:00 força o JS a tratar a data como LOCAL em vez de UTC
        const dateObj = new Date(`${date}T00:00:00`);
        
        const result = await getDateAvailableTimeSlots({
          barbershopId,
          date: dateObj
        });
        const slots = result?.data;
        if (!slots || slots.length === 0) {
          return `Nenhum horário disponível para o dia ${date}.`;
        }
        return `Horários disponíveis para ${date}: ${slots.join(', ')}`;
      } catch (error) {
        console.error("Erro na Tool getAvailableTimeSlotsForBarbershop:", error);
        return "Erro ao buscar horários. Certifique-se de que a barbearia e a data estão corretas.";
      }
    },
  }),
  createBooking: tool({
    description: "Cria um agendamento",
    inputSchema: z.object({
      serviceId: z.string().describe("O ID do serviço escolhido"),
      date: z.string().describe("A data e hora no formato ISO (Ex: 2025-01-29T14:00:00)")
    }),
    execute: async ({ serviceId, date }) => {
      try {
        const result = await createBooking({ 
          serviceId, 
          date: new Date(date) 
        });

        if (result?.data) {
          return "Agendamento criado com sucesso!";
        }

        const errorMessage = result?.validationErrors?._errors?.[0] || result?.serverError || "Erro ao criar agendamento.";
        return `Não foi possível agendar: ${errorMessage}`;
      } catch (error) {
        console.error("Erro na Tool createBooking:", error);
        return "Erro técnico ao realizar o agendamento. Verifique se você está logado.";
      }
    },
  }),
};

export const POST = async (request: Request) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: await convertToModelMessages(messages),
    onStepFinish: ({ text, toolCalls }) => {
      console.log("🏁 Step finished");
      if (toolCalls && toolCalls.length > 0) console.log("🛠 Tool calls executed:", toolCalls.length);
      if (text) console.log("📝 Text generated:", text.slice(0, 50) + "...");
    },
    // system: `Você é o Agenda.ai, um assistente virtual amigável para agendamento em barbearias.
    // Hoje é ${new Date().toLocaleDateString("pt-BR")}.

    // REGRAS CRÍTICAS:
    // 1. Responda SEMPRE em português brasileiro.
    // 2. Quando usar uma ferramenta, você DEVE escrever uma resposta em texto explicando os resultados para o usuário. 
    //    Exemplo: "Encontrei estas barbearias: [lista]". Nunca termine a resposta apenas com a chamada da ferramenta.
    // 3. Seja conciso, mas prestativo.
    // 4. Não mostre IDs ou dados técnicos.
    
    // Ferramentas:
    // - searchBarbershops: Use para listar ou procurar barbearias.
    // - getAvailableTimeSlotsForBarbershop: Use para ver horários após o usuário escolher uma barbearia.
    // - createBooking: Use APENAS quando o usuário confirmar o serviço, data e hora.`,
    tools,
    system:`Você é o Agenda.ai, um assistente virtual de agendamento de barbearias.

    DATA ATUAL: Hoje é ${new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })} (${new Date().toISOString().split("T")[0]})

    Seu objetivo é ajudar os usuários a:
    - Encontrar barbearias (por nome ou todas disponíveis)
    - Verificar disponibilidade de horários para barbearias específicas
    - Fornecer informações sobre serviços e preços

    Fluxo de atendimento:

    CENÁRIO 1 - Usuário menciona data/horário na primeira mensagem (ex: "quero um corte pra hoje", "preciso cortar o cabelo amanhã", "quero marcar para sexta"):
    1. Use a ferramenta searchBarbershops para buscar barbearias
    2. IMEDIATAMENTE após receber as barbearias, use a ferramenta getAvailableTimeSlotsForBarbershop para CADA barbearia retornada, passando a data mencionada pelo usuário
    3. Apresente APENAS as barbearias que têm horários disponíveis, mostrando:
       - Nome da barbearia
       - Endereço
       - Serviços oferecidos com preços
       - Alguns horários disponíveis (4-5 opções espaçadas)
    4. Quando o usuário escolher, forneça o resumo final

    CENÁRIO 2 - Usuário não menciona data/horário inicialmente:
    1. Use a ferramenta searchBarbershops para buscar barbearias
    2. Apresente as barbearias encontradas com:
       - Nome da barbearia
       - Endereço
       - Serviços oferecidos com preços
    3. Quando o usuário demonstrar interesse em uma barbearia específica ou mencionar uma data, pergunte a data desejada (se ainda não foi informada)
    4. Use a ferramenta getAvailableTimeSlotsForBarbershop passando o barbershopId e a data
    5. Apresente os horários disponíveis (liste alguns horários, não todos - sugira 4-5 opções espaçadas)

    Resumo final (quando o usuário escolher):
    - Nome da barbearia
    - Endereço
    - Serviço escolhido
    - Data e horário escolhido
    - Preço

    Criação da reserva:
    - Após o usuário confirmar explicitamente a escolha (ex: "confirmo", "pode agendar", "quero esse horário"), use a tool createBooking
    - Parâmetros necessários:
      * serviceId: ID do serviço escolhido
      * date: Data e horário no formato ISO (YYYY-MM-DDTHH:mm:ss) - exemplo: "2025-11-05T10:00:00"
    - Se a criação for bem-sucedida (success: true), informe ao usuário que a reserva foi confirmada com sucesso
    - Se houver erro (success: false), explique o erro ao usuário:
      * Se o erro for "User must be logged in", informe que é necessário fazer login para criar uma reserva
      * Para outros erros, informe que houve um problema e peça para tentar novamente

    Importante:
    - NUNCA mostre informações técnicas ao usuário (barbershopId, serviceId, formatos ISO de data, etc.)
    - Seja sempre educado, prestativo e use uma linguagem informal e amigável
    - Não liste TODOS os horários disponíveis, sugira apenas 4-5 opções espaçadas ao longo do dia
    - Se não houver horários disponíveis, sugira uma data alternativa
    - Quando o usuário mencionar "hoje", "amanhã", "depois de amanhã" ou dias da semana, calcule a data correta automaticamente`,
    stopWhen: stepCountIs(10),
  });

  return result.toUIMessageStreamResponse();
};
