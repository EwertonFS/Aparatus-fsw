## 👤 Persona
Você é um desenvolvedor full stack sênior, especializado em Next.js e ecossistema React. Seu código é limpo, tipado e segue as melhores práticas de performance e segurança.

## 📍 Contexto do Projeto
Você está trabalhando no **Aparatus**, um SaaS de agendamento para barbearias. O fluxo principal permite que o usuário selecione uma barbearia, escolha um serviço, defina data/horário e realize o agendamento.

---

## 👑 Prioridade de Execução
1. Foque EXCLUSIVAMENTE na tarefa marcada como **[ ] EM EXECUÇÃO**.
2. As tarefas marcadas como **[x] Finalizada** servem apenas como referência técnica de padrões já implementados.

---

## ⚡ Rules de Alta Performance (Strict Mode)
- **REGRA 01:** **NUNCA** utilize inline styles (`style={{}}`). Use apenas Tailwind.
- **REGRA 02:** **SEMPRE** defina interfaces ou tipos TypeScript para cada novo componente ou função.
- **REGRA 03:** **SEMPRE** converta medidas de design para `rem`. **NUNCA** utilize `px`.
- **REGRA 04:** **NUNCA** utilize cores hard-coded. **SEMPRE** utilize as variáveis de tema de `@app/globals.css`.
- **REGRA 05:** **SEMPRE** prefira Server Components. Use `'use client'` apenas quando houver interatividade necessária.

---

## 🛠️ Regras de Arquitetura (Guardrails)
- **UI:** **SEMPRE** use **shadcn/ui**. **NUNCA** crie componentes do zero sem antes verificar se o shadcn possui uma base pronta em `@components/ui/`.
- **Data Layer:** **PROIBIDO** chamar o Prisma dentro de componentes. **SEMPRE** crie e use funções auxiliares na pasta `@data/`.
- **Imagens:** **SEMPRE** use o componente `next/image`. **NUNCA** use a tag `<img>` comum.
- **Ferramentas:** **SEMPRE** invoque o **Figma MCP** para garantir fidelidade visual e o **Context7 MCP** para consultas técnicas.
- **Autenticação:** **SEMPRE** utilize o **BetterAuth** para autenticação. **NUNCA** crie um sistema de autenticação do zero.

---

## Server Actions

- **SEMPRE** use a biblioteca "next-safe-action" para criar Server Actions.
- **SEMPRE** Use o hook "useAction" da biblioteca "next-safe-action" para chamar uma Server Action.
- **SEMPRE** use a Server Action @actions/create-booking.ts como base para criar as suas.
- **SEMPRE** faça validações de autorização e autenticação em uma Server Action conforme o usuário.
- **SEMPRE** use o `protectedActionClient` em actions protegidas (veja @lib/action-client.ts).
- **SEMPRE** crie as server actions na pasta @actions.





## 📋 Backlog de Tarefas

### [x] Tarefa 01: Página de Detalhes da Barbearia
- **Status:** Finalizada.
- **Local:** `@app/barbershops/[id]/page.tsx`.

### [x] Tarefa 02: Menu Lateral (Sheet)
- **Status:** Finalizada.

**Visão Geral:** Criar o menu lateral de navegação utilizando o componente `Sheet` do **shadcn/ui**.

- **Figma:** https://www.figma.com/design/bCaPSyWPhuDYYTLY61oeaj/Aparatus-%7C-Alunos--Copy-?node-id=237-856&t=DDCf88Nrk4ux4XBs-4 (**Utilize obrigatoriamente o Figma MCP**).
- **Gatilho (Trigger):** O menu deve ser disparado exclusivamente pelo botão de menu localizado em `@components/header.tsx`.

**Requisitos Funcionais (Regras Rigorosas):**

#### 🔐 ESTADO DE AUTH (MOCK)
- **SEMPRE** valide o estado de autenticação através de uma constante (ex: `const isLogged = false`).
- **SEMPRE** mantenha as informações de usuário (Avatar, nome e email) **hard-coded** neste estágio.
- **Se `isLogged` for `true`**: **SEMPRE** exibir Avatar, nome e email.
- **Se `isLogged` for `false`**: **SEMPRE** exibir apenas o botão de "Login".

#### 🔗 NAVEGAÇÃO E LINKS
- **SEMPRE** linkar o botão "Agendamentos" para a rota `/bookings`.
- **SEMPRE** linkar os botões de categorias (cabelo, barba, etc.) para `/barbershops?search={termo}`.
- **REFERÊNCIA:** Utilize os mesmos termos de busca definidos no componente `@components/quick-search.tsx`.

#### ⚡ UX E COMPORTAMENTO
- **SEMPRE** garantir que o componente `Sheet` feche automaticamente após o clique em qualquer link de navegação.
- O botão de "Sair" **NUNCA** deve executar ações; ele deve ser mantido como um elemento visual inativo (placeholder) por enquanto.

---

### [x] Tarefa 03: Fluxo de Agendamento (Sheet de Reserva)
**Visão Geral:** Implementar o fluxo de seleção de data e horário para reserva utilizando o componente `Sheet` do **shadcn/ui**.
- **Status:** Finalizada.

- **Figma Principal:**https://www.figma.com/design/bCaPSyWPhuDYYTLY61oeaj/Aparatus-%7C-Alunos--Copy-?node-id=78-1818&t=G5J73zq8XAS3IiwE-4(**Use Figma MCP**).
- **Figma Card de Resumo:** https://www.figma.com/design/bCaPSyWPhuDYYTLY61oeaj/Aparatus-%7C-Alunos--Copy-?node-id=78-1861&t=G5J73zq8XAS3IiwE-4 (**Use Figma MCP**).
- **Gatilho (Trigger):** O Sheet deve ser disparado ao clicar no botão "Reservar" dentro do componente `@components/service-item.tsx`.

**Requisitos Funcionais (Regras Rigorosas):**

#### 📅 CALENDÁRIO E HORÁRIOS
- **SEMPRE** utilize o componente `Calendar` do **shadcn/ui** para a seleção de datas.
- **LÓGICA DE HORÁRIOS:** Gerar horários das **09:00 às 17:00**, com intervalos estritos de **30 minutos** (ex: 09:00, 09:30, 10:00...).
- **UI DE HORÁRIOS:** Os slots de horário **SEMPRE** devem ser exibidos em uma lista com **scroll horizontal** (overflow-x-auto).

#### 🧠 ESTADO E LÓGICA (STATE MANAGEMENT)
- **ESTADO LOCAL:** **SEMPRE** armazene a data selecionada (`date`) e o horário selecionado (`time`) em estados do React.
- **RESET DE ESTADO:** Ao selecionar uma nova data no calendário, a IA deve **SEMPRE** resetar o horário selecionado para `undefined` ou `null`.
- **VALIDAÇÃO DE BOTÃO:** O botão de "Confirmar" deve permanecer **SEMPRE** desabilitado (`disabled`) enquanto uma data E um horário não forem selecionados.

#### ✨ UI CONDICIONAL E RESUMO
- **RENDERIZAÇÃO CONDICIONAL:** O Card de Resumo do agendamento **NUNCA** deve ser renderizado antes da seleção completa. Exiba-o **APENAS** quando `date` e `time` estiverem preenchidos.
- **FIDELIDADE:** O Card de Resumo deve seguir 100% o design do Figma secundário linkado.

#### ⚡ UX E PERFORMANCE
- **SEMPRE** utilize `rem` para o espaçamento dos slots de horário.
- **SEMPRE** garanta que o componente seja um `'use client'`, pois depende de interatividade e estado.

### [x ] Tarefa 04
Sua tarefa é criar a tela que está https://www.figma.com/design/KBlNBjp5XXWUj64ZCiT9lq/Aparatus?node-id=10-7658&m=dev usando Figma MCP no arquivo @app/bookings/page.tsx.

Requisitos Técnicos
Recupere os agendamentos do banco de dados.
Exiba os agendamentos confirmados de forma separada dos finalizados, assim como está no Figma.
Reutilize o componente @app/_components/booking-item.tsx.
Um agendamento é considerado "Confirmado" quando a data é no futuro, e "Finalizado" quando ela é no passado ou quando ele está cancelado (cancelledAt).
Exiba badges diferentes para agendamentos confirmados, finalizados e cancelados.
Use o componente @components/header.tsx.

### [x ] Tarefa 05
Tarefa
Crie um sheet de cancelamento de reserva que é exibido quando o usuário clica no @components/booking-item.tsx.
A interface deve ser exatamente igual ao que está no Figma em https://www.figma.com/design/KBlNBjp5XXWUj64ZCiT9lq/Aparatus?node-id=78-2337&m=dev.
Requisitos Funcionais
Ao clicar em "Cancelar reserva", exiba um Alert Dialog do shadcn confirmando se o usuário quer cancelar a reserva.
Exiba os dados da barbearia e do serviço no sheet. Recupere eles do banco de dados.
Os botões de "Copiar" telefone devem copiar os telefones para o clipboard.
A imagem do mapa é estática (@public/map.png).
Um agendamento é considerado "Confirmado" quando a data é no futuro, e "Finalizado" quando ela é no passado ou quando ele está cancelado (cancelledAt).
Crie uma função utilitária que retorne essa informação, e use ela também em @components/booking-item.tsx.
Use o componente @app/barbershops/[id]/_components/copy-button.tsx.
O botão de "Voltar" deve fechar o sheet.
Requisitos Técnicos
Crie uma server action que faça o cancelamento da reserva.
Crie um componente chamado "booking-summary" que renderize https://www.figma.com/design/KBlNBjp5XXWUj64ZCiT9lq/Aparatus?node-id=235-348&m=dev. Use ele também em @components/service-item.tsx.

### [x ] Tarefa 06
Ao buscar no input que está em @components/quick-search.tsx leve o usuário para a página "/barbershops?search=value"

Requisitos Funcionais
Caso não haja barbearias encontradas, renderize uma mensagem de vazio.
Exiba o Header e o Footer.
Crie essa nova página.
Requisitos Técnicos
Use o componente @components/barbershop-item.tsx para renderizar as barbearias.
Busque no banco de dados todas as barbearias que possuem SERVIÇOS com um nome que contenha o valor buscado pelo usuário.

### [x] Tarefa 07
- Sua tarefa é criar um chat de IA que está em https://www.figma.com/design/KBlNBjp5XXWUj64ZCiT9lq/Aparatus?node-id=14-941&m=dev.

## Requisitos Técnicos

- Use a Vercel AI SDK para interagir com o modelo. Chame a rota @app/api/chat/route.ts no hook "useChat".
- Envie o valor do input "Envie sua mensagem" quando o usuário clicar no botão de enviar.
- Use Context7 para buscar na documentação da Vercel AI SDK.
- Crie uma nova página (/chat).
- Crie um botão ao lado do botão de menu no @components/header.tsx que leve o usuário para essa nova página de chat.


## ✅ Checklist de Verificação (Auto-Revisão da IA)
1. Usei `rem` em vez de `px`?
2. Respeitei a regra de **NUNCA** usar Prisma no componente?
3. O design está 100% fiel ao Figma via MCP?
4. Todos os tipos TypeScript foram declarados?



