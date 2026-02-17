Projeto full stack para gerenciamento de tarefas, com autenticação, controle de permissões (usuário/admin) e funcionalidades básicas de CRUD de tarefas. <br>
Backend feito em Java usando Quarkus, banco de dados PostgreSQL e frontend em React com TypeScript.<br>
A aplicação é dockerizada com Docker Compose. <br>

<b>Tecnologias </b>

-Backend: Java, Quarkus, Hibernate ORM Panache, JPA, PostgreSQL <br>
-Frontend: React, TypeScript, Material UI (MUI) <br>
-Infraestrutura: Docker, Docker Compose <br>
-Autenticação: JWT (não funcional no momento) <br>


<b>Estrutura do Projeto</b> <br>

/task-manager-gradle — Código fonte do backend Quarkus <br>
/frontend — Código fonte do frontend React <br>
docker-compose.yml — Configuração dos containers Docker <br>


<b>Como rodar o projeto localmente</b><br>

Pré-requisitos<br>
-Docker e Docker Compose instalados <br>
-Java 17 instalado localmente para buildar o backend - Opcional <br><br>

-Clonar o repositório<br>
-Buildar e subir os containers: docker-compose up --build <br>


