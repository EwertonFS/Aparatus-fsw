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



## ✅ Checklist de Verificação (Auto-Revisão da IA)
1. Usei `rem` em vez de `px`?
2. Respeitei a regra de **NUNCA** usar Prisma no componente?
3. O design está 100% fiel ao Figma via MCP?
4. Todos os tipos TypeScript foram declarados?



