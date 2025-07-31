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
`
  {
      "name": "Henrique",
      "password": "xxxxxxxx"
  }
`

- `POST /api/register` - Registro de novo usuário
`
  {
      "name": "Henrique",
      "password": "xxxxxxxx"
  }
`

- `GET /api/me` - Informações do usuário logado

### Estatísticas Gerais
- `GET /api/stats` - Lista de estatísticas sobre usuários e chamados

### Usuários
- `GET /api/users` - Lista de usuários (fitros: name, isActive)
`GET /api/users?name=Henrique&isActive=true`

### Chamados (Tickets)
- `GET /api/tickets` - Lista de chamados (filtros: name)
`GET /api/tickets?name=Acesso`

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
- [] Todas as consultas devem ter paginação: 10 itens p/página
- [] Todas as consultas devem permitir o usuário escolher o número de itens (min 10 - max 50)
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