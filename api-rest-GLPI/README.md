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

## Requisitos Funcionais

### Autenticação e Autorização
- [x] Login com usuário e senha
- [x] Registro de novos usuários
- [x] Autenticação JWT
- [ ] Autenticação MFA (QR Code e código manual)
- [ ] Perfis de usuário (self-service/administrador)

### Dashboard e Visualização
- [x] Dados analíticos de chamados
- [x] Estatísticas de usuários
- [x] Métricas de categorias
- [ ] Painel personalizado por usuário
- [ ] Informações de perfil completas

### Gestão de Dados
- [x] Consulta de dados GLPI
- [x] Agregação e análise de métricas
- [ ] Gestão de tarefas pessoais
- [ ] Filtros avançados por permissão

## Requisitos Não Funcionais

- **Performance**: Tempo de resposta ≤ 5 segundos
- **Segurança**: Autenticação JWT obrigatória
- **Escalabilidade**: Suporte a múltiplos usuários simultâneos
- **Disponibilidade**: API REST stateless

## Regras de Negócio

### Permissões
- **Self-service**: Acesso limitado aos próprios dados
- **Administrador**: Acesso completo a todos os dados
- Usuário `glpi_system` possui permissão de administrador por padrão
- Administradores podem promover usuários
- Status do usuário deve estar ativo para acesso

### Dados
- Apenas usuários ativos podem se autenticar
- Dados sensíveis são protegidos por nível de acesso
- Histórico de chamados preserva integridade temporal
- SLA é calculado baseado em regras do GLPI

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
├── @types/          # Definições de tipos
├── database/        # Configuração do banco
├── env/            # Variáveis de ambiente
├── http/           # Controllers e rotas
├── use-cases/      # Lógica de negócio
├── app.ts          # Configuração da aplicação
└── server.ts       # Inicialização do servidor
```