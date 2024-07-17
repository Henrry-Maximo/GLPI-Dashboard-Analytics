
## API ENDPOINTS

# USER
- [x] api-glpi/user/users - lista de usuários por nome
- [x] api-glpi/user/users-by-count - lista de contagem de usuários existentes
- [x] api-glpi/user/users-by-tickets - lista de contagem de chamados por usuário

# TICKET
- [x] api-glpi/ticket/tickets - lista de chamados por nome
- [x] api-glpi/ticket/tickets-by-count-status - lista de contagem de chamados por status
- [x] api-glpi/ticket/tickets-by-status-date - lista de contagem de chamados por status ao longo do tempo
- [x] api-glpi/ticket/tickets-by-count-urgency - lista de contagem de chamados por urgência
- [x] api-glpi/ticket/tickets-by-categorie - lista de contagem de chamados associados a uma categoria
- [x] api-glpi/ticket/tickets-last-by-categorie - lista de chamados por categoria (últimos 10)
- [x] api-glpi/ticket/tickets-line-time - lista de chamados por entidade/status/urgência/usuário/técnico (últimos 10)
- [x] api-glpi/ticket/tickets-late - lista de contagem de chamados que atingiram o prazo do SLA (últimos 10)
- [x] api-glpi/ticket/tickets-line-late-by-status-date - lista de contagem de chamados (quantidade) por status e data
- [x] api-glpi/ticket/tickets-by-technician - lista de contagem de chamados (quantidade) por técnico
- [x] api-glpi/ticket/tickets-by-type - lista de contagem de chamados (quantidade) por tipo
- [x] api-glpi/ticket/tickets-by-technician-solution - lista de contagem de chamados (quantidade) que foram solucionados por técnico

# CATEGORY
- [x] api-glpi/categorie/categories - lista de categorias por nome
- [x] api-glpi/categorie/categories-by-count - lista com o total de categorias existentes

## REQUIREMENTS

# FUNCTIONAL REQUIREMENTS
- [] Usuário deve poder se autenticar (id, password);
- [] Usuário deve poder escanear QRCode do MFA;
- [] Usuário deve poder se autenticar no MFA digitando o código;
- [] Usuário deve poder visualizar informações de cadastro previamente no header;
  - [] Nome, Entidade, Localização, Comentário e Picture.
- [] Usuário deve poder visualizar perfil;
  - [] Nome, Última Atualização de Senha, Localização, Status, Comentário, Último Login, Data de Criação, User AD, User AD Hash e Picture.
- [] Usuário deve poder visualizar painel primário sobre suas estatísticas; 
- [] Usuário deve poder registrar uma tarefa;
- [] Usuário deve poder modificar uma tarefa;
- [] Usuário deve poder exluir uma tarefa;
- [] Usuário deve poder apenas visualizar suas tarefas;

# NON-FUNCTIONAL REQUIREMENTS
- [] Desempenho: alcançar uma eficiência de resposta de até 5 segundos;
- [] Utilizar Web Token (JWT) no acesso às operações da aplicação (rotas);

# RULES BUSINESS
- [] O sistema precisa possuir cargos: self-service/administrador
- [] Por padrão, o usuário glpi_system recebe permissão de administrador;
- [] O usuário automáticamente recebe permissão de self-service;
- [] O adm do sistema pode transformar o usuário em um administrador;
- [] O administrador do sistema precisa liberar o acesso ao usuário (status);
- [] O usuário da aplicação pode escolher entre tema preto/branco;

