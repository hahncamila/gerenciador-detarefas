Projeto full stack para gerenciamento de tarefas, com autenticação, controle de permissões (usuário/admin) e funcionalidades básicas de CRUD de tarefas.
Backend feito em Java usando Quarkus, banco de dados PostgreSQL e frontend em React com TypeScript.
A aplicação é dockerizada com Docker Compose.

Tecnologias

-Backend: Java, Quarkus, Hibernate ORM Panache, JPA, PostgreSQL
-Frontend: React, TypeScript, Material UI (MUI)
-Infraestrutura: Docker, Docker Compose
-Autenticação: JWT (não funcional no momento)


Estrutura do Projeto

/task-manager-gradle — Código fonte do backend Quarkus
/frontend — Código fonte do frontend React
docker-compose.yml — Configuração dos containers Docker


Como rodar o projeto localmente

Pré-requisitos
-Docker e Docker Compose instalados
-Java 17 instalado localmente para buildar o backend - Opcional

-Clonar o repositório
-Buildar e subir os containers: docker-compose up --build
