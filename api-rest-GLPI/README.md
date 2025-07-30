# GLPI Dashboard Analytics API

API REST para análise e visualização de dados do sistema GLPI, fornecendo endpoints para dashboards e relatórios analíticos.

## Visão Geral

Esta API conecta-se ao banco de dados do GLPI para extrair e processar informações sobre chamados, usuários e categorias, oferecendo dados estruturados para dashboards e análises.

## Tecnologias

- **Node.js** com **TypeScript**
- **Fastify** (Framework web)
- **Knex.js** (Query builder)
- **MySQL** (Banco de dados GLPI)
- **JWT** (Autenticação)
- **Zod** (Validação de dados)

## API Endpoints

### Autenticação
- `POST /api/sessions` - Login de usuário
- `POST /api/register` - Registro de novo usuário

### Usuários
- `GET /api/users` - Lista usuários por nome
- `GET /api/users/count` - Contagem total de usuários
- `GET /api/users/tickets` - Contagem de chamados por usuário

### Chamados (Tickets)
- `GET /api/tickets/search` - Busca chamados (específico por ID)
- `GET /api/tickets/state` - Contagem por status/categoria/urgência
- `GET /api/tickets/date` - Chamados solucionados por data
- `GET /api/tickets/last` - Último chamado cadastrado
- `GET /api/tickets/status` - Contagem por status
- `GET /api/tickets/status-date` - Evolução por status ao longo do tempo
- `GET /api/tickets/urgency` - Contagem por urgência
- `GET /api/tickets/category` - Contagem por categoria
- `GET /api/tickets/category/last` - Últimos 10 por categoria
- `GET /api/tickets/timeline` - Timeline por entidade/status/urgência
- `GET /api/tickets/sla` - Chamados que atingiram prazo SLA
- `GET /api/tickets/technician` - Contagem por técnico
- `GET /api/tickets/type` - Contagem por tipo
- `GET /api/tickets/technician/solutions` - Soluções por técnico

### Categorias
- `GET /api/categories` - Lista categorias por nome
- `GET /api/categories/count` - Contagem total de categorias

## Tarefas de Desenvolvimento

### RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar uma usuário
- [x] Deve ser possível logar como um usuário
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter todos os usuários
- [x] Deve ser possível obter todos os chamados
- [x] Deve ser possível obter estatísticas dos usuários/chamados
- [] Deve ser possível cadastrar um chamado
- [] Deve ser possível listar todos os chamados disponíveis para atendimento
- [] Deve ser possível filtrar chamados por suas características
- [] Deve ser possível visualizar detalhes de um chamado

### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [] O usuário deve ser identificado por um JWT (JSON Web Token)

### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um usuário duplicado
- [] O usuário que quer algo específico, entrará em contato com os técnicos via WhatsApp
- [] Todos os filtros são opcionais

## Instalação e Uso

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar em desenvolvimento
npm run start:dev

# Build para produção
npm run build
npm start
```

## Estrutura do Projeto

```
src/
├── @types/         # Definições de tipos
├── database/       # Configuração do banco
├── env/            # Variáveis de ambiente
├── http/           # Controllers e rotas
├── repositories/   # Contrato e conexão com o banco de dados
├── use-cases/      # Lógica de negócio
├── app.ts          # Configuração da aplicação
└── server.ts       # Inicialização do servidor
```