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
- **Vitest** (Testes)

## Arquiteturas

- Clean Architecture
- Factory Pattern (Dependency Injection)
- Repository Pattern

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
- `GET /api/tickets` - Lista de chamados (filtros: id, name, status, id_recipient, id_request_type, id_categories)
`GET /api/tickets?name=Acesso`

## Tarefas de Desenvolvimento

### RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar uma usuário
- [x] Deve ser possível logar como um usuário via banco de dados
- [x] Deve ser possível logar como um usuário via GLPi API
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter todos os usuários
- [x] Deve ser possível obter todos os chamados
- [x] Deve ser possível obter estatísticas dos usuários/chamados
- [x] Deve ser possível cadastrar um chamado
- [x] Deve ser possível listar todos os chamados disponíveis para atendimento
- [x] Deve ser possível filtrar chamados por suas características
- [x] Deve ser possível visualizar detalhes de um chamado
- [] Deve ser possível visualizar o fluxo de todos os chamados que não forem solucionados/fechados
- [] Deve ser possível visualizar o desempenho mensal dos técnicos (por mês e por técnico)
- [] Deve ser possível obter último chamado mais lista de pendentes (monitoramento)
- [] Deve ser possível visualizar todas as categorias por quantidade de chamados

### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)
- [x] O usuário não deve poder usar recursos da API se estiver desativado 
- [] A API deve seguir um padrão de resposta consistente com chave "meta" e "result"
  - meta para cálculos
  - result para item ou itens
- [] Todas as rotas devem retornar status HTTP apropriado (200, 201, 400, etc)
- [] Deve ser possível exportar relatórios filtrados (CSV ou JSON)
- [] Todas as datas devem seguir formato ISO ou estar convertidas conforme locale configurado (ex: DD/MM/YYYY)
- [] As respostas devem ser consistentes mesmo quando o array estiver vazio (sempre enviar "result": [])
- [x] Só usuários ativos podem se logar na aplicação
- [] Em consultar por nome, trabalhar índices otimizados

### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um usuário duplicado
- [] O usuário que quer algo específico, entrará em contato com os técnicos via WhatsApp
- [x] Todas as consultas devem ter paginação: 10 itens p/página
- [x] Todas as consultas devem permitir o usuário escolher o número de itens (min 10 - max 50)
- [x] Todos os filtros são opcionais

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

## Script MySQL Database (teste rápido)

```
DROP DATABASE IF EXISTS glpi;
CREATE DATABASE glpi;
USE glpi;

-- Tabela simplificada de tickets
CREATE TABLE glpi_tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  entities_id INT NOT NULL DEFAULT 1,
  name VARCHAR(100) NOT NULL,
  date DATETIME NULL,
  closedate DATETIME NULL,
  solvedate DATETIME NULL,
  date_mod DATETIME NULL,
  users_id_lastupdater INT DEFAULT 0,
  status INT DEFAULT 1,
  users_id_recipient INT NOT NULL,
  requesttypes_id INT NOT NULL,
  content TEXT,
  urgency INT,
  impact INT,
  priority INT,
  itilcategories_id INT,
  type INT DEFAULT 1,
  global_validation INT DEFAULT 1,
  slas_id_ttr INT DEFAULT 0,
  slas_id_tto INT DEFAULT 0,
  slalevels_id_ttr INT DEFAULT 0,
  time_to_resolve DATETIME NULL,
  time_to_own DATETIME NULL,
  begin_waiting_date DATETIME NULL,
  sla_waiting_duration INT DEFAULT 0,
  ola_waiting_duration INT DEFAULT 0,
  olas_id_tto INT DEFAULT 0,
  olas_id_ttr INT DEFAULT 0,
  olalevels_id_ttr INT DEFAULT 0,
  ola_ttr_begin_date DATETIME NULL,
  internal_time_to_resolve DATETIME NULL,
  internal_time_to_own DATETIME NULL,
  waiting_duration INT DEFAULT 0,
  close_delay_stat INT DEFAULT 0,
  solve_delay_stat INT DEFAULT 0,
  takeintoaccount_delay_stat INT DEFAULT 0,
  actiontime INT DEFAULT 0,
  is_deleted INT DEFAULT 0,
  locations_id INT,
  validation_percent INT DEFAULT 0,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários compatível com sua interface
CREATE TABLE glpi_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  realname VARCHAR(100) DEFAULT '',
  firstname VARCHAR(100) DEFAULT '',
  locations_id INT DEFAULT 1,
  is_active INT DEFAULT 1,
  is_deleted INT DEFAULT 0,
  auths_id INT DEFAULT 1,
  authtype INT DEFAULT 1,
  date_mod DATETIME DEFAULT CURRENT_TIMESTAMP,
  profiles_id INT DEFAULT 1,
  entities_id INT DEFAULT 1,
  usertitles_id INT DEFAULT 1,
  usercategories_id INT DEFAULT 1,
  csv_delimiter VARCHAR(1) DEFAULT ';',
  is_deleted_ldap INT DEFAULT 0,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  groups_id INT DEFAULT 1,
  users_id_supervisor INT DEFAULT 1,
  highcontrast_css INT DEFAULT 0
);

-- Usuário padrão de teste
INSERT INTO glpi_users (name, password) 
VALUES ('glpi', '$2a$08$gEmIAv2Wz/kIWdlGr2.2W.6dzIorD9rB9N8gpYrbph60LCVxq6acq');

-- SELECTs pra checar se deu bom
SELECT * FROM glpi_users;
SELECT * FROM glpi_tickets;

```