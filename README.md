<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/.github/logo.png?raw=true" width="200px" />
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

Projeto FullStack para Gerenciamento de academia desenvolvido durante o GoStack Bootcamp da Rocketseat. Este foi o projeto final para a certificação.

A versão web do projeto Gympoint representa a visão da academia, ou seja, todas funcionalidades presentes na versão web são para administradores. As funcionalidades para o aluno estão no aplicativo mobile.

# Informações importantes

1. Este projeto foi desenvolvido utilizando as stacks **NodeJS** (backend), **ReactJS**(frontend) e **React Native**(Mobile);

2) A versão **Mobile** foi testada utilizando o emulador Android (Android Studio);

3. Para poder criar todas as imagens (banco de dados) e rodar aplicação, será necessário instalar o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/).

4) Banco de dados utilizados:
   - PostgreSQL (Banco relacional)
   - MongoDB (NoSQL orientado a documentos)
   - Redis (NoSQL armazenando chave-valor)

5. Implementação de novas features (não faziam parte do desafio)

a) **Frontend Web**

- No módulo de matrícula, o `input` para data de início só será habilitado caso houver um plano selecionado;

b) **Backend**

- Envio de email ao aluno nas seguintes situações:
  - Cancelamento da matrícula;
  - Alteração do plano.

c) **Frontend Mobile**

- O aluno que não possuir a sua matrícula **Ativa**, conseguirá acessar o App mas com o botão de check-in desabilitado, podendo apenas enviar mensagens aos administradores da academia;
- Em caso de matrícula não **Ativa**, será apresentada uma mensage ao aluno com a data de sua ativação;
- Apresentação do nome do aluno logado;
- Apresentação do plano atual do aluno;
- Opção para logout.

# Passos para instalação

Instalando as Imagens Docker

### PostgreSQL

```sh
$ docker run --name nome-imagem-postgres -e POSTGRES_PASSWORD=secret-password -d postgres
```

### MongoDB

```sh
$ docker run --name nome-imagem-mongo -d mongo:latest
```

### Redis

```sh
$ docker run --name nome-imagem-redis -d redis:alpine
```

## GUI

- [Postbird](https://electronjs.org/apps/postbird) para PostgreSQL
- [MongoDB Compass](https://www.mongodb.com/download-center/compass) para MongoDB

## 1. Clonando o repositório

Para baixar/clonar o repositório, utilize o comando:

```git
git clone https://github.com/angelopietro/gympoint.git
```

## 2. Configurando as aplicações

### Backend

1. No diretório **backend** do projeto, renomeie o arquivo `env.example` para `.env`.

2. Abra o arquivo `.env` e configure as constantes preenchendo as informações solicitadas.

**OBS:** Neste arquivo `.env`, estarão todas as variáveis de ambiente necessárias para configurar a aplicação.

O condeúdo que você encontrará dentro do arquivo deve estar igual ao abaixo:

```js
FRONT_CORE_URL=http://localhost:3000
NODE_ENV=development

# Auth
APP_SECRET=

# Database MySQL
DB_DIALECT=mysql
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=mysqlgympoint

# Mongo
MONGO_URL=

# Redis
REDIS_HOST=
REDIS_PORT=

# Mail
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=

# Sentry
SENTRY_DNS=
```

3. `docker-compose up` para subir o **mysql, mongodb e redis**
4. `yarn sequelize db:migrate` para criar as estruturas de banco
5. `yarn sequelize db:seed:all` para popular a tabela de users com um usuário padrão
6. `yarn queue` para iniciar o serviço de envio de email (abra e execute em outro terminal)
7. `yarn dev` para iniciar o serviço do backend

Abaixo um resumo sequencial dos passos a serem executados:

```sh
# instalar as dependências
yarn install

# Criar as estruturas do banco de dados
yarn sequelize db:migrate

# Popular a tabela de users com um usuário padrão
yarn sequelize db:seed:all

# Iniciar o serviço de envio de email
yarn queue

# Iniciar o serviço do backend
yarn dev
```

### Frontend Web

No diretório **frontend** execute:

```sh
# instalar as dependências
yarn install

# Iniciar o serviço do frontend
yarn start
```

1. Abra o seu browse e digite o endereço `http://localhost:3000`
2. Após acessar a página de `Login`, preencha os dados com as seguintes informações:

```text
Usuário: admin@gypoint.com
Senha: 123456
```

Pronto!!! Agora você já poderá realizar a administração de sua academia (cadastro de alunos, planos, matrículas e responder as dúvidas)

### Frontend Mobile

Emulador

- O Gympoint foi desenvolvido e testado com o emulador do Android Studio.
  Observação: Não foi realizado testes em IOS (Iphone)

No diretório **mobile** do projeto execute:

```sh
# instalar as dependências
yarn install

# Iniciar a aplicação
# Como foi desenvildo utilizando o Android, utilize o run-android.
react-native run-android
react-native start
```

Para que você possa acessar como aluno na versão **mobile**, cadastre um aluno na área de administração **Frontend Web**, realize a sua matrícula (precisa estar **ATIVA**) , e utilize o ID recebido no email após a realização e liberação da matrícula.

## Author

👤 **Ângelo Pietro**

- Linkedin: [Ângelo Pietro](https://www.linkedin.com/in/angelopietro/)
- Github: [@angelopietro](https://github.com/angelopietro)
