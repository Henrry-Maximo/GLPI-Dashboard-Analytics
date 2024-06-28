Projeto GLPI Analysis
Descrição
O projeto GLPI Analysis é uma aplicação desenvolvida para fornecer análise técnica detalhada da plataforma GLPI, com o objetivo de oferecer estatísticas, dashboards e gráficos para técnicos e, potencialmente, para clientes no futuro. Utilizando tecnologias modernas como Node.js, TypeScript, Fastify, MySQL (MariaDB), ReactJS e phosphor-react, o sistema visa facilitar a visualização e interpretação de dados relacionados ao GLPI.

Funcionalidades Principais
Estatísticas Detalhadas: Visualização de métricas importantes como total de tickets, status dos tickets, tempo médio de resolução, entre outros.
Dashboard Interativo: Interface intuitiva com gráficos e dados dinâmicos para uma análise mais eficaz.
Suporte Multiusuário: Capacidade de segmentar informações técnicas e, eventualmente, disponibilizar dados relevantes para os clientes.
Integração com GLPI: Conexão direta com a base de dados GLPI para acesso em tempo real às informações.
Tecnologias Utilizadas
Backend: Node.js, TypeScript, Fastify, MySQL (MariaDB), Mysql2
Frontend: ReactJS, TypeScript, phosphor-react
Outros: HTML, CSS (SCSS), Git
Instalação e Uso
Para executar o projeto localmente:

Clone o Repositório:

bash
Copy code
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
Instale as Dependências:

bash
Copy code
# Instale as dependências do backend
cd backend
npm install

# Instale as dependências do frontend
cd ../frontend
npm install
Configuração do Banco de Dados:

Configure o acesso ao banco de dados MySQL (MariaDB) no arquivo de configuração backend/src/config/database.ts.
Executar o Servidor:

bash
Copy code
# No diretório backend/
npm run dev
Executar o Cliente:

bash
Copy code
# No diretório frontend/
npm start
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request com melhorias, correções de bugs ou novas funcionalidades.