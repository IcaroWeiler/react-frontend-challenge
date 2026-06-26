# INSTRUCTIONS

## Projeto escolhido

O projeto escolhido foi o **CineDash**, uma aplicação front-end para descoberta e busca de filmes usando a API do TMDB.

### Stack utilizada

- React + TypeScript
- TanStack Router (file-based routing)
- TanStack Query
- TanStack Table
- Zustand (estado global e persistência)
- Tailwind CSS
- Vitest + React Testing Library

## Como rodar o projeto

### Pré-requisitos

- Node.js 18+ (recomendado Node.js 20+)
- npm

### Configuração de ambiente (.env)

- A aplicação precisa de uma chave da API do TMDB no arquivo `.env` na raiz do projeto.
- Existe um arquivo `.env.example` como referência.
- Copie os campos do `.env.example`, crie um `.env` e preencha com sua chave.
- Sem essa configuração, as chamadas para a API do TMDB não funcionarão corretamente.

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

A aplicação iniciará na porta 3000.

### 3. Gerar rotas (quando criar/editar arquivos em src/routes)

```bash
npm run generate-routes
```

### 4. Rodar testes

```bash
npm run test
```

## Observações

- O projeto utiliza autenticação sem backend, apropriada para contexto de desafio/protótipo.
- A fonte de dados dos filmes é a API do TMDB consumida diretamente no front-end.
- Caso uma nova rota não apareça, execute novamente `npm run generate-routes`.
