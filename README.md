# Guia de Instalação e Configuração do Prisma

Este guia descreve todos os passos e comandos utilizados para configurar o Prisma, o adaptador para PostgreSQL (Neon) e o sistema de seeds neste projeto.

## 1. Instalação das Dependências

Para que o Prisma funcione corretamente com TypeScript e PostgreSQL (usando adaptadores de borda/edge como o Neon), instalamos os seguintes pacotes:

### Dependências de Produção
```powershell
# Instala o cliente e o adaptador necessário para:
# import { PrismaPg } from "@prisma/adapter-pg";
npm install @prisma/client @prisma/adapter-pg pg
```

### Dependências de Desenvolvimento
```powershell
npm install -D prisma @types/pg tsx
```

## 2. Configuração do Schema Prisma (Caminho Customizado)

No arquivo `prisma/schema.prisma`, configuramos o gerador para salvar o cliente em uma pasta específica. Isso permite a importação customizada:
`import { PrismaClient } from "../generated/prisma/client";`

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma/client"
}
```

## 3. Comandos de Geração

Sempre que houver mudanças no arquivo `schema.prisma`, utilize o comando abaixo para criar fisicamente os arquivos na pasta `generated`:

```powershell
npx prisma generate
```

## 4. Gerenciamento da Instância do Prisma (Singleton)

O arquivo `lib/prisma.ts` é fundamental para a performance da aplicação. Ele implementa o padrão **Singleton** para a instância do `PrismaClient`.

### Por que isso é importante?
- **Evita múltiplas conexões:** Em desenvolvimento, o Next.js recarrega o código frequentemente (Hot Reload). Sem esse arquivo, cada recarregamento criaria uma nova conexão com o banco de dados, o que rapidamente esgotaria o limite de conexões do Neon/PostgreSQL.
- **Global Cache:** O código armazena a instância do Prisma no objeto `global`, garantindo que apenas uma instância seja usada em todo o ciclo de vida da aplicação durante o desenvolvimento.
- **Configuração do Adaptador:** É aqui que o `PrismaPg` é acoplado ao cliente, permitindo que o Prisma funcione corretamente em ambientes de Edge/Serverless.

---

## 5. Configuração do Script de Seed

Para permitir a execução automatizada de dados iniciais (seed), realizamos duas configurações:

### A. Configuração no `prisma.config.ts`
Adicionamos o comando que o Prisma deve usar para rodar o arquivo de TypeScript:

```typescript
export default defineConfig({
  // ... outras configurações
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
})
```

### B. Execução do Seed
Para popular o banco de dados, utilize o comando:

```powershell
npx prisma db seed
```

## Resumo de Comandos Úteis

| Comando | Descrição |
| :--- | :--- |
| `npx prisma generate` | Gera o cliente Prisma com base no schema. |
| `npx prisma db seed` | Executa o script de população do banco de dados. |
| `npx prisma studio` | Abre uma interface visual para navegar nos dados. |

---

## 6. Configuração do Shadcn UI

Para a interface, utilizamos o **Shadcn UI** na sua versão mais recente.

### Inicialização
Para evitar erros de cache do `npx`, instalamos a CLI localmente primeiro:
```powershell
npm install -D shadcn@latest
npx shadcn init -d
```

### Adicionando Componentes
Para adicionar os componentes utilizados no projeto:
```powershell
npx shadcn add button sheet avatar badge alert-dialog
```

### Bibliotecas Adicionais
Também utilizamos:
- `sonner`: Para notificações toast.
- `next-safe-action`: Para lidar com Server Actions de forma segura.

```powershell
npm install sonner next-safe-action
```

### Estrutura de Pastas
Os componentes são instalados na raiz em:
- `components/ui/*.tsx`
- `lib/utils.ts`

Nas páginas e componentes, as importações devem seguir o padrão:
`import { Button } from "@/components/ui/button";`
