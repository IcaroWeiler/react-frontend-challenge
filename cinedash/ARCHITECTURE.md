# Decisões de arquitetura

## 1) Estrutura de pastas escolhida

A organização segue uma abordagem por feature (vertical slicing), com separação clara por responsabilidade dentro de cada domínio.

- src/features: regras e fluxos de negócio por contexto funcional.
  - Exemplo: auth, discovery, watchlist, detail, search.
- src/pages: composição de tela (orquestra componentes de feature).
- src/routes: definição de rotas com file-based routing (TanStack Router).
- src/shared: recursos compartilhados entre features (tipos, mappers, UI base, API helpers).
- src/app: infraestrutura transversal da aplicação (tema, providers, hooks globais).
- src/tests: testes organizados refletindo a estrutura principal (features/shared).

### Motivos da decisão

- Escalabilidade: cada feature cresce isoladamente (api, model, ui, store) sem acoplamento excessivo.
- Manutenção: fica fácil localizar código por domínio de negócio.
- Reuso com controle: somente o que é realmente comum sobe para shared.
- Clareza de navegação: pages e routes ficam finas, com lógica concentrada nas features.

## 2) Autenticação sem backend

A autenticação foi implementada como fluxo client-side, adequada ao contexto do desafio.

### Como foi feito

- O login recebe email/senha e valida localmente via schema.
- Um token JWT é gerado no navegador com jwt-encode.
- O estado de autenticação é armazenado com Zustand + persist no localStorage.
- As rotas protegidas verificam presença de token para permitir acesso.
- As informações específicas do usuário ficaram relacionadas ao seu JWT, permitindo assim que usuários diferentes sempre acessem storages diferentes, e cada um fique com a seu storage específico.

- OBS: Todas as consultas à API da TMDB precisam de uma key, que deverá estar no .env na raiz do projeto. Eu adicionei um exemplo (.env.example) de como ficaria, é só trocar o valor pela chave de vocês.

## 3) Desafios encontrados com a API do TMDB

A robustez da API é o maior desafio na minha opinião, achar os endpoints e os parâmetros corretos para cada tarefa fica mais difícil quando a base é grande. Porém por ser uma API muito sólida, provavelmente você sempre achará o que precisa.

## 4) O que eu senti que poderia melhorar

- Senti que poderia ter dado nomes mais padronizados aos arquivos e alguns tipos
- Poderia ter aproveitado rotas "blank" no router, acabei não utilizando

## Resumo técnico

As decisões priorizaram simplicidade, organização por domínio e velocidade de entrega para um desafio front-end, mantendo uma base preparada para evolução futura para autenticação real em backend e integrações externas mais robustas.
