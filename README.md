<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://user-images.githubusercontent.com/5533726/71780030-2a577600-2f9c-11ea-8692-84656aacf1fa.png" />
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

Projeto FullStack em **NodeJS** (backend), **ReactJS**(frontend) e **React Native**(Mobile) para Gerenciamento de academia desenvolvido durante o GoStack Bootcamp da Rocketseat. Este foi o projeto final para a certificação.

**OBS:** A versão web do projeto Gympoint representa a visão da academia, ou seja, todas funcionalidades presentes na versão web são para administradores. As funcionalidades para o aluno estão no aplicativo mobile.

# Informações importantes

1. A versão **Mobile** foi testada utilizando o emulador **Android (Android Studio)**;

2. No ambente de desenvolvimento, foi utilizado o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) com as imagens/serviços do **PostgreSQL** (Banco relacional), **MongoDB** (NoSQL orientado a documentos) e **Redis** (NoSQL armazenando chave-valor)

# Features adicionais

Estas features não faziam parte do desafio e foram desenvolvidas para melhorar a experiência do usuário (UX)

a) **Frontend Web**

- No módulo de matrícula, o `input` para data de início só será habilitado caso houver um plano selecionado;
- Tamanhos de compomentes e área de trabalho do usuário padronizados

**Sugestão de melhoria:** Ajustar a aplicação para que seja responsivo :wink:

b) **Backend**

- Envio de email ao aluno nas seguintes situações:
  - Cancelamento da matrícula;
  - Alteração do plano.
- Implementação de segurança **CORS** e **Helmmet** (Coleção de nove funções de middlewares menores que configuram cabeçalhos HTTP relacionados à segurança)

c) **Frontend Mobile**

- O aluno que não possuir a sua matrícula **Ativa**, conseguirá acessar o App mas com o **botão de check-in desabilitado**, podendo apenas enviar mensagens aos administradores da academia;
- Em caso de matrícula não **Ativa**, será apresentada uma mensagem ao aluno com a data de sua ativação;
- Apresentação do nome do aluno logado;
- Apresentação do plano atual do aluno;
- Opção para logout.

# Ambiente de desenvolvimento

[Visual Studio Code](https://code.visualstudio.com/) - Editor de código  
[Imsomnia](https://insomnia.rest/) - Cliente de serviços http (APIs)  
[Node](https://nodejs.org/) - Interpretador de JavaScript orientado a eventos  
[Yarn](yarnpkg.com) - Gerenciador de pacotes  
[Postbird](https://electronjs.org/apps/postbird) - GUI PostgreSQL  
[MongoDB Compass](https://www.mongodb.com/download-center/compass) - GUI MongoDB  
[Reactotron](https://github.com/infinitered/reactotron) - Ferramenta para inspecionar as aplicações ReactJS e React Native.
[Docker](https://www.docker.com/) - Plataforma aberta para criação, execução e publicação (deploy) de containers  
[Docker Compose](https://docs.docker.com/compose/) - Orquestrador de containers Docker  
[Android Studio](https://developer.android.com/studio) - Emulador Mobile

# Passos para instalação

Após ter seu ambiente de desenvolvimento todo instalado e configurado com as suas ferramentas preferenciais, siga os passos abaixo:

### 1. Instalando as Imagens/Serviços Docker

#### PostgreSQL

```bash
$ docker run --name nome-container-postgres -e POSTGRES_PASSWORD=secret-password -d postgres
```

#### MongoDB

```bash
$ docker run --name nome-container-mongo -d mongo:latest
```

#### Redis

```bash
$ docker run --name nome-container-redis -d redis:alpine
```

---

### 2. Clonando o repositório

Para baixar/clonar o repositório, utilize o comando:

```git
git clone https://github.com/angelopietro/gympoint.git
```

---

### 3. Configurando as aplicações

### Backend

**Passos para instalação e execução:**

1. No diretório **backend** do projeto, renomeie o arquivo `env.example` para `.env`.

2. Abra o arquivo `.env` e configure as constantes(variáveis de ambiente) preenchendo as informações solicitadas.

3. Crie a base de dados no **postgresql** (utilizando linha de comando ou o GUI de sua preferência) com o mesmo nome informado na constante **DB_NAME** do arquivo de configuração **.env**

4. Abra o arquivo `docker-compose.yml` e configure suas variáveis de acordo com a instalação e parâmetros de sua imagem docker para cada um dos serviços.

5. Comandos a serem executados:

```bash
# Iniciar os serviços do postgres, mongodb e redis
$ docker-compose up

# Instalar as dependências do backend
$ yarn install

# Para criar as estruturas de banco
$ yarn sequelize db:migrate

# Para popular a tabela de users com um usuário padrão
$ yarn sequelize db:seed:all

# Para iniciar o serviço de envio de email (abra e execute em outro terminal)
$ yarn queue

# Para iniciar o serviço do backend
$ yarn dev
```

---

### Frontend Web

**Passos para instalação e execução:**

No diretório **frontend** execute as seguintes linhas de comando:

```bash
# instalar as dependências
$ yarn install

# Iniciar o serviço do frontend
$ yarn start
```

1. Abra o seu browse e digite o endereço `http://localhost:3000`
2. Após acessar a página de `Login`, realize o acesso utilizando com as seguintes informações:

> **Usuário:** admin@gypoint.com  
> **Senha:** 123456

Pronto!!! Agora você já poderá realizar a administração de sua academia (cadastro de alunos, planos, matrículas e responder as dúvidas)

---

### Frontend Mobile

**Importante:**

1. Antes de rodar a aplicação **mobile** certifique-se de que já tenhas realizado a configuração de seu emulador **Android** utilizando o [Androi Studio(https://developer.android.com/studio)] ou o [Genymotion](https://www.genymotion.com/)

2. O Gympoint foi desenvolvido e testado com o emulador do Android Studio.
   Não foi realizado testes em **IOS (Iphone)**

**Passos para isntalação e execução:**

No diretório **mobile** do projeto execute as seguintes linhas de comando:

```bash
# instalar as dependências
yarn install

# Iniciar a aplicação
# Como foi desenvildo utilizando o Android, utilize o run-android.
react-native run-android
react-native start
```

Para que você possa acessar como aluno na versão **mobile**, cadastre um aluno na área de administração **Frontend Web**, realize a sua matrícula (precisa estar **ATIVA**) , e utilize o ID recebido no email após a realização e liberação da matrícula.

## Autor

:mortar_board: **Ângelo Pietro**

- Linkedin: [Ângelo Pietro](https://www.linkedin.com/in/angelopietro/)
- Github: [@angelopietro](https://github.com/angelopietro)
