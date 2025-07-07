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

### Requisitos Funcionais

#### Autenticação e Autorização
- [x] Login com usuário e senha
- [x] Registro de novos usuários
- [x] Autenticação JWT
- [ ] Middleware de autorização por perfil
- [ ] Refresh token para sessões
- [ ] Logout e invalidação de tokens
- [ ] Recuperação de senha

#### Gestão de Usuários
- [x] Listar usuários ativos
- [x] Contar usuários totais
- [x] Estatísticas de chamados por usuário
- [ ] Criar novo usuário
- [ ] Atualizar dados do usuário
- [ ] Desativar/ativar usuário
- [ ] Gerenciar perfis e permissões
- [ ] Histórico de atividades do usuário

#### Gestão de Chamados
- [x] Buscar chamados por ID
- [x] Listar chamados por filtros
- [x] Estatísticas por status/categoria/urgência
- [x] Relatórios por período
- [x] Métricas de SLA
- [ ] Criar novo chamado
- [ ] Atualizar status do chamado
- [ ] Adicionar comentários/followups
- [ ] Atribuir técnico responsável
- [ ] Anexar arquivos
- [ ] Histórico completo do chamado

#### Gestão de Categorias
- [x] Listar categorias
- [x] Contar categorias totais
- [ ] Criar nova categoria
- [ ] Atualizar categoria existente
- [ ] Desativar categoria
- [ ] Hierarquia de categorias

#### Dashboard e Relatórios
- [x] Métricas básicas de chamados
- [x] Estatísticas por técnico
- [x] Timeline de atividades
- [ ] Relatórios personalizados
- [ ] Exportação de dados (CSV/PDF)
- [ ] Gráficos e visualizações
- [ ] Alertas e notificações
- [ ] KPIs em tempo real

#### Gestão de Entidades
- [ ] Listar entidades
- [ ] Filtrar dados por entidade
- [ ] Hierarquia de entidades
- [ ] Permissões por entidade

#### Gestão de Equipamentos
- [ ] Listar equipamentos
- [ ] Buscar por tipo/modelo
- [ ] Histórico de manutenção
- [ ] Status de garantia

### Requisitos Não Funcionais

#### Performance
- [ ] Tempo de resposta ≤ 5 segundos
- [ ] Cache de consultas frequentes
- [ ] Paginação em listagens
- [ ] Índices otimizados no banco
- [ ] Compressão de respostas

#### Segurança
- [x] Autenticação JWT obrigatória
- [ ] Rate limiting por IP/usuário
- [ ] Validação rigorosa de entrada
- [ ] Logs de auditoria
- [ ] Criptografia de dados sensíveis
- [ ] Headers de segurança

#### Escalabilidade
- [ ] Suporte a múltiplos usuários simultâneos
- [ ] Pool de conexões do banco
- [ ] Monitoramento de recursos
- [ ] Balanceamento de carga

#### Disponibilidade
- [x] API REST stateless
- [ ] Health check endpoint
- [ ] Tratamento de erros padronizado
- [ ] Retry automático em falhas
- [ ] Backup e recuperação

#### Observabilidade
- [ ] Logs estruturados
- [ ] Métricas de performance
- [ ] Tracing de requisições
- [ ] Alertas de sistema

### Regras de Negócio

#### Permissões e Acesso
- [ ] Self-service: acesso limitado aos próprios dados
- [ ] Técnico: acesso a chamados atribuídos
- [ ] Supervisor: acesso a dados da equipe
- [ ] Administrador: acesso completo
- [ ] Super-admin: gestão de usuários e sistema
- [ ] Usuário `glpi_system` é super-admin por padrão

#### Validações de Dados
- [x] Apenas usuários ativos podem se autenticar
- [ ] Chamados devem ter categoria obrigatória
- [ ] Status de chamado segue fluxo definido
- [ ] Técnico só pode ser atribuído se ativo
- [ ] Validação de SLA por categoria

#### Integridade e Auditoria
- [ ] Histórico de alterações preservado
- [ ] Dados sensíveis protegidos por nível
- [ ] Log de todas as operações críticas
- [ ] Backup automático de dados importantes
- [ ] Retenção de dados conforme política

#### Fluxo de Trabalho
- [ ] Chamado novo → Em andamento → Solucionado → Fechado
- [ ] Notificações automáticas por mudança de status
- [ ] Escalação automática por SLA
- [ ] Aprovação para operações críticas

## Roadmap de Desenvolvimento

### Fase 1 - Core API (Atual)
- [x] Autenticação básica
- [x] Consultas de dados
- [x] Estrutura base da API

### Fase 2 - CRUD Completo
- [ ] Operações de criação e atualização
- [ ] Gestão completa de usuários
- [ ] Middleware de autorização

### Fase 3 - Features Avançadas
- [ ] Dashboard personalizado
- [ ] Relatórios e exportação
- [ ] Notificações em tempo real

### Fase 4 - Otimização
- [ ] Performance e cache
- [ ] Monitoramento e logs
- [ ] Testes automatizados

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