
# Desafio Tech Testes - DNC

Este repositório contém os testes de integração de uma API desenvolvida utilizando **Node.js**, **TypeScript**, **Jest**, **Supertest** e **PostgreSQL**. O objetivo do projeto foi aplicar testes automatizados para garantir a robustez e a funcionalidade correta das rotas da API.

## Funcionalidades

A API desenvolvida permite a gestão de alunos com as seguintes operações CRUD (Criar, Ler, Atualizar, Deletar):

- **POST /aluno**: Criação de um novo aluno.
- **GET /aluno**: Recuperação de todos os alunos.
- **PUT /aluno/:id**: Atualização de um aluno existente.
- **DELETE /aluno/:id**: Exclusão de um aluno pelo ID.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Jest**: Framework de testes para JavaScript e TypeScript.
- **Supertest**: Biblioteca para realizar testes de integração de APIs HTTP.
- **Knex.js**: Query Builder para Node.js, utilizado para comunicação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para persistir os dados.

## Instalação

 1. Clone este repositório
git clone https://github.com/PatrickSergio/desafio7dnc.git


2. Navegue até o diretório do projeto
cd desafio7dnc

4. Instale as dependências
npm install

4. Configure o banco de dados
Certifique-se de que você tenha o PostgreSQL instalado e configurado corretamente em sua máquina. Para configurar o banco de dados, edite o arquivo knexfile.ts com os dados de conexão corretos para seu ambiente.

5. Execute os testes
Depois de configurar o banco de dados, você pode rodar os testes da API com o comando:

npm test
Isso executará os testes de integração e verificará se tudo está funcionando corretamente.

Estrutura de Diretórios

├── src/                 # Código fonte da API
│   ├── config/          # Arquivo de configuração do knex (conexão com o banco)
│   ├── module/          # Módulos e funcionalidades da API
│   ├── app.ts           # Arquivo principal que inicializa o servidor
├── tests/               # Arquivos de testes de integração
├── knexfile.ts          # Arquivo de configuração do banco de dados (Knex)
└── package.json         # Dependências e scripts do projeto
Considerações
O banco de dados utilizado é o PostgreSQL, e as migrações para criação da tabela de alunos podem ser feitas utilizando o Knex.
Os testes foram escritos utilizando o Jest para garantir que todas as rotas funcionem corretamente.
Licença
Este projeto é de uso exclusivo para fins educacionais e como parte de um desafio técnico da Escola DNC. Não é destinado à produção e deve ser usado apenas como uma base para aprendizado e aprimoramento das habilidades de desenvolvimento e testes.
