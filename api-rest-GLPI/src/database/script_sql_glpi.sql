USE glpi_database;

show tables;

SELECT name, password, password_last_update, firstname, locations_id FROM glpi_users;
SELECT * FROM glpi_users;

# retornar todos os chamados por nome
SELECT 
    id,
    entities_id,
    name,
    date_creation,
    date_mod,
    solvedate,
    closedate,
    users_id_recipient,
    status,
    priority,
    itilcategories_id,
    type,
    locations_id
FROM
    glpi_tickets;

# retornar número de chamados por status
SELECT 
	COUNT(id) AS total_chamados,
	COUNT(CASE WHEN status = 1 THEN 1 END) AS total_abertos,
	COUNT(CASE WHEN status = 2 THEN 1 END) AS total_atribuidos,
	COUNT(CASE WHEN status = 4 THEN 1 END) AS total_pendentes,
	COUNT(CASE WHEN status = 5 THEN 1 END) AS total_solucionados,
	COUNT(CASE WHEN status = 6 THEN 1 END) AS total_fechados
FROM glpi_tickets;

#glpi_tickets: Contém informações sobre os tickets, como status, prioridade, datas de abertura e fechamento.
#glpi_tickettasks: Contém as tarefas relacionadas aos tickets, útil para analisar o tempo gasto em diferentes tipos de tarefas.
#glpi_ticketvalidations: Armazena as validações dos tickets, pode ser usada para verificar a qualidade das resoluções.
#glpi_ticketcosts: Informações sobre os custos associados aos tickets.
#glpi_tickets_users: Relações entre tickets e usuários, útil para ver quem está resolvendo quais tickets.
#glpi_problems: Dados sobre problemas recorrentes, que podem ser analisados para identificar áreas que precisam de melhorias.
#glpi_changes: Informações sobre mudanças no sistema, importante para entender o impacto das mudanças nos tickets.
#glpi_computers: Informações sobre os computadores gerenciados, útil para inventário e análise de ativos.
#glpi_printers: Dados sobre impressoras gerenciadas.
#glpi_networkequipments: Informações sobre equipamentos de rede.