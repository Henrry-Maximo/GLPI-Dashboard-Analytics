USE glpi_database;

show tables;

# retornar todos os usuários por nome / senha / última atualização senha / primeiro nome / setor
SELECT name, password, password_last_update, firstname, locations_id FROM glpi_users;

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
    COUNT(CASE
        WHEN status = 1 THEN 1
    END) AS total_abertos,
    COUNT(CASE
        WHEN status = 2 THEN 1
    END) AS total_atribuidos,
    COUNT(CASE
        WHEN status = 4 THEN 1
    END) AS total_pendentes,
    COUNT(CASE
        WHEN status = 5 THEN 1
    END) AS total_solucionados,
    COUNT(CASE
        WHEN status = 6 THEN 1
    END) AS total_fechados
FROM
    glpi_tickets;

# retornar números de chamados por status ao longo do tempo
SELECT 
    DATE(date_creation) AS data, status, COUNT(id) AS quantidade
FROM
    glpi_tickets
WHERE
	status NOT IN (6)
GROUP BY DATE(date_creation) 
, status
ORDER BY DATE(date_creation) DESC;

# retornar número de chamados por usuário
SELECT 
    u.name AS usuario,
    COUNT(t.id) AS quantidade_chamados
FROM 
    glpi_tickets t
JOIN 
    glpi_users u ON t.users_id_recipient = u.id
GROUP BY 
    u.name
ORDER BY 
    quantidade_chamados DESC;
    

# retorna número de chamados atribuídos para um técnico
SELECT 
    u.name AS tecnico,
    COUNT(t.id) AS quantidade_chamados
FROM 
    glpi_tickets t
JOIN 
    glpi_tickets_users tu ON t.id = tu.tickets_id
JOIN 
    glpi_users u ON tu.users_id = u.id
WHERE 
    tu.type = 2 -- Atribuição de técnico
GROUP BY 
    u.name
ORDER BY 
    quantidade_chamados DESC;

# retorna número de chamados por data/técnico (todos os status)
SELECT 
    DATE(a.date_creation) AS data,
    c.name AS tecnico,
    COUNT(a.id) AS quantidade_chamados
FROM
    glpi_tickets a
JOIN
    glpi_tickets_users b ON a.id = b.tickets_id
JOIN
    glpi_users c ON b.users_id = c.id
WHERE
    b.type = 2
GROUP BY 
    DATE(a.date_creation),
    c.name
ORDER BY 
    data DESC, 
    quantidade_chamados DESC;

# retorna número de chamados por técnico/data/status (solucionado)
SELECT 
    DATE(t.date_creation) AS data,
    u.name AS tecnico,
    t.status,
    COUNT(t.id) AS quantidade_chamados
FROM
    glpi_tickets t
JOIN
    glpi_tickets_users tu ON t.id = tu.tickets_id
JOIN
    glpi_users u ON tu.users_id = u.id
WHERE
    tu.type = 2 AND
    t.status = 6
GROUP BY 
    DATE(t.date_creation),
    u.name
ORDER BY 
    data DESC, 
    quantidade_chamados DESC;

# retornar número de incidente/requisição (formulário)
SELECT 
    COUNT(CASE WHEN t.type = 1 THEN 1 END) AS 'incident',
    COUNT(CASE WHEN t.type = 2 THEN 1 END) AS 'request'
FROM
    glpi_tickets t

