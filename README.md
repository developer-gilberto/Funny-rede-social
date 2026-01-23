# Funny® - A rede social divertida.
## Sobre o Projeto

**Funny** é uma rede social que permite aos usuários fazer publicações com texto e/ou imagens, buscar por outros usuários, conectar-se com amigos e interagir em uma plataforma social “clean” e divertida. Desenvolvida usando JavaScript, Node.js, Express e Handlebars.

---

<img width="432" height="331" alt="Screenshot From 2026-01-23 13-57-07" src="https://github.com/user-attachments/assets/a45f33f9-265a-4c19-a4fe-cf0d7c6a384e" />

## Receba notificações de amizade
<img width="1387" height="923" alt="Screenshot From 2026-01-03 10-50-19" src="https://github.com/user-attachments/assets/b8916ac5-c989-4e74-807e-f42c0d9ba869" />

## Veja suas publicações
<img width="1126" height="861" alt="pubs" src="https://github.com/user-attachments/assets/6f9b3b96-d6c3-4503-a8d3-659e05221c3b" />

## Edite seu perfil
<img width="501" height="593" alt="perf-edit" src="https://github.com/user-attachments/assets/f50dc3dc-57f7-41fe-a8e0-ae04e583b9d1" />

## Encontre pessoas
<img width="836" height="406" alt="encontre" src="https://github.com/user-attachments/assets/6ea82101-ecc6-43bb-9683-fa03f6d9a9dc" />

## Adicione amigos
<img width="350" height="862" alt="Screenshot From 2026-01-03 10-49-28" src="https://github.com/user-attachments/assets/f2d5a3d2-259e-4e56-a717-bf35f501c0de" />

## Responsividade para dispositivos móveis
<img width="357" height="735" alt="Screenshot From 2026-01-03 10-40-42" src="https://github.com/user-attachments/assets/6d979631-44e3-493f-a00d-c4a3926335e4" />
<img width="351" height="727" alt="mob" src="https://github.com/user-attachments/assets/bc4f1988-97a4-4bb9-8cc9-2dbba0af9869" />

## Feed "clean"
<img width="1174" height="597" alt="Screenshot From 2026-01-02 23-47-29" src="https://github.com/user-attachments/assets/68007f70-ac38-4965-9d9b-27cbf36e34cb" />

## Login
<img width="882" height="758" alt="Screenshot From 2026-01-02 21-13-30" src="https://github.com/user-attachments/assets/23634c84-de9b-4baf-8375-7ef7782a1bfc" />


---


## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MySQL2** - Driver MySQL para Node.js
- **Handlebars** - Template engine para renderização de páginas

### Autenticação e Segurança
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Criptografia de senhas
- **cookie-parser** - Manipulação de cookies

### Upload de Arquivos
- **express-fileupload** - Upload de imagens de perfil e publicações

### Ambiente e Desenvolvimento
- **dotenv** - Gerenciamento de variáveis de ambiente
- **nodemon** - Hot reload durante desenvolvimento
- **Docker & Docker Compose** - Containerização do banco de dados

---

## ✨ Funcionalidades

### 👤 Gestão de Usuários
- ✅ Cadastro de novos usuários
- ✅ Login com autenticação JWT
- ✅ Logout seguro
- ✅ Edição de perfil (nome e foto de perfil)
- ✅ Visualização de perfil próprio e de outros usuários
- ✅ Busca de usuários

### 📝 Publicações
- ✅ Criar publicações com texto
- ✅ Criar publicações com imagens
- ✅ Criar publicações com texto e imagens
- ✅ Visualização de publicações ordenadas por data
- ✅ Upload e armazenamento de imagens

### 👥 Sistema de Amizades
- ✅ Enviar solicitações de amizade
- ✅ Aceitar solicitações de amizade
- ✅ Notificações de solicitações pendentes
- ✅ Visualização de amigos

---

## 📁 Estrutura do Projeto

```
Funny-rede-social/
├── docker/
│   └── init.sql                    # Script de inicialização do banco de dados
├── src/
│   ├── controllers/
│   │   └── usersController.js      # Controladores das rotas
│   ├── db/
│   │   ├── connection.js           # Configuração da conexão com MySQL
│   │   └── uploads/                # Diretório de uploads
│   │       ├── imgPub/             # Imagens de publicações
│   │       └── profilePic/         # Fotos de perfil
│   ├── middlewares/
│   │   └── usersMiddleware.js      # Middlewares de validação e processamento
│   ├── models/
│   │   └── usersModel.js           # Queries e operações do banco de dados
│   ├── services/
│   │   ├── authServices.js         # Serviços de autenticação
│   │   └── checkIfTokenIsValid.js  # Validação de tokens JWT
│   ├── sql/
│   │   └── templates SQL           # Templates de tabelas
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars     # Layout principal
│   │   ├── partials/               # Componentes reutilizáveis
│   │   └── pages/                  # Páginas da aplicação
│   │       ├── login.handlebars
│   │       ├── createAccount.handlebars
│   │       ├── home.handlebars
│   │       ├── myProfile.handlebars
│   │       ├── userProfile.handlebars
│   │       └── ...
│   ├── public/                     # Arquivos estáticos (CSS, JS, imagens)
│   ├── app.js                      # Configuração principal do Express
│   └── router.js                   # Definição de rotas
├── docker-compose.yaml             # Configuração do Docker
├── package.json                    # Dependências e scripts
└── .env                            # Variáveis de ambiente (não versionado)
```

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 22 ou superior)
- **pnpm** ou gerenciador de pacotes de sua preferência
- **Docker** e **Docker Compose** para o banco de dados (recomendado)
- **MySQL** (caso não use Docker)

---

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/developer-gilberto/Funny-rede-social.git
cd Funny-rede-social
```

### 2. Instale as dependências

```bash
npm install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT_DEFAULT=3000
JWT_SECRET='your-jwt-secret'

DB_HOST='localhost'
DB_USER='user_funny'
DB_PASSWORD='password123'
DB_DATABASE='db_funny'
```

### 4. Inicie o banco de dados com Docker

```bash
docker-compose up -d
```

O Docker irá:
- Criar um container MySQL
- Executar o script `init.sql` automaticamente
- Criar as tabelas necessárias

### 5. Execute a aplicação

**Modo desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

### 6. Acesse a aplicação

Abra seu navegador em: `http://localhost:3000`

---

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT_DEFAULT` | Porta padrão caso PORT não esteja definida | `3000` |
| `DB_HOST` | Host do banco de dados | `localhost` |
| `DB_USER` | Usuário do MySQL | `user_funny ou root` |
| `DB_PASSWORD` | Senha do MySQL | `senha123` |
| `DB_DATABASE` | Nome do banco de dados | `db_funny` |
| `JWT_SECRET` | Chave secreta para geração de tokens JWT | `minha_chave_secreta` |

### Arquivos Estáticos

O Express serve arquivos estáticos de dois diretórios:
- `/src/public` - CSS, JavaScript do cliente, imagens do site
- `/src/db/uploads` - Uploads de usuários (fotos de perfil e publicações)

---

## 🗄️ Banco de Dados

### Estrutura das Tabelas

#### Tabela: `users`
```sql
CREATE TABLE users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(150) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255) DEFAULT NULL,
  creation_date VARCHAR(50) NOT NULL
);
```

#### Tabela: `pubs`
```sql
CREATE TABLE pubs (
  id_pub INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  text_pub TEXT DEFAULT NULL,
  img_pub VARCHAR(255) DEFAULT NULL,
  date_pub VARCHAR(50) NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);
```

#### Tabela: `friendships`
```sql
CREATE TABLE friendships (
  id_user INT NOT NULL,
  id_friend INT NOT NULL,
  friendship BOOLEAN DEFAULT FALSE,
  friendship_date VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id_user, id_friend),
  FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
  FOREIGN KEY (id_friend) REFERENCES users(id_user) ON DELETE CASCADE
);
```

### Diagrama de Relacionamentos

```
users (1) -----> (N) pubs
users (N) <----> (N) friendships
```

---

## 🛣️ Rotas da Aplicação

### Rotas Públicas (GET)

| Rota | Descrição |
|------|-----------|
| `GET /` | Página de login |
| `GET /createAccount` | Página de cadastro |

### Rotas Públicas (POST)

| Rota | Descrição | Body |
|------|-----------|------|
| `POST /registerAccount` | Registra novo usuário | `user_name, user_email, user_password` |
| `POST /login` | Realiza login | `user_email, user_password` |

### Rotas Protegidas (GET) - Requer autenticação

| Rota | Descrição |
|------|-----------|
| `GET /home` | Página inicial com feed |
| `GET /myProfile` | Perfil do usuário logado |
| `GET /userProfile?id_user={id}` | Perfil de outro usuário |
| `GET /logout` | Realiza logout |

### Rotas Protegidas (POST) - Requer autenticação

| Rota | Descrição | Body/Files |
|------|-----------|------------|
| `POST /publish` | Cria uma publicação | `textPub` (opcional), `imgPub` (opcional, file) |
| `POST /editProfile` | Edita perfil do usuário | `user_name` (opcional), `profile_pic` (opcional, file) |
| `POST /searchProfile` | Busca usuários | `search` |
| `GET /addFriend?id_user={id}` | Envia solicitação de amizade | Query param: `id_user` |
| `GET /acceptFriend?id_user={id}` | Aceita solicitação de amizade | Query param: `id_user` |

---

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Registro:**
   - Senha é criptografada com bcryptjs
   - Usuário é salvo no banco de dados

2. **Login:**
   - Valida email e senha
   - Gera token JWT
   - Token é armazenado em cookie HTTP-only

3. **Autorização:**
   - Middleware `authorizeUser` verifica token em cada requisição protegida
   - Token é validado e decodificado
   - Informações do usuário são extraídas do token

4. **Logout:**
   - Cookie com token é limpo

### Middlewares de Autenticação

- `authServices.authenticateUser` - Gera token JWT após login
- `authServices.authorizeUser` - Verifica token em rotas protegidas
- `authServices.checkIfTokenIsValid` - Valida e decodifica token

---

## 📦 Middlewares Principais

### Validação e Processamento

| Middleware | Descrição |
|------------|-----------|
| `checkIfEmailInUse` | Verifica se email já está cadastrado |
| `checkIfAccountExist` | Verifica se conta existe no login |
| `validateEmailAndPassword` | Valida formato de email e senha |
| `checkIfPasswordTrue` | Compara senha com hash do banco |
| `encryptPassword` | Criptografa senha antes de salvar |

### Upload de Arquivos

| Middleware | Descrição |
|------------|-----------|
| `uploadImgPub` | Processa upload de imagem de publicação |
| `uploadProfilePic` | Processa upload de foto de perfil |

### Banco de Dados

| Middleware | Descrição |
|------------|-----------|
| `registerPubDB` | Registra publicação no banco |
| `updateNewProfilePicDB` | Atualiza foto de perfil |
| `updateNewProfileNameDB` | Atualiza nome de usuário |
| `getUserProfileDB` | Busca dados de perfil de usuário |
| `getUserProfilePubsDB` | Busca publicações de usuário |
| `searchAllUsersDB` | Busca usuários por nome |

### Sistema de Amizades

| Middleware | Descrição |
|------------|-----------|
| `checkFriendRequest` | Verifica solicitações de amizade pendentes |
| `sendRequestFriendship` | Envia solicitação de amizade |
| `acceptRequestFriendship` | Aceita solicitação de amizade |
| `getDataFriendship` | Busca status de amizade entre usuários |

---

## 📸 Upload de Imagens

### Imagens de Publicações

- **Diretório:** `src/db/uploads/imgPub/`
- **Acesso via URL:** `/imgPub/{nome_da_imagem}`
- **Campo no formulário:** `imgPub`

### Fotos de Perfil

- **Diretório:** `src/db/uploads/profilePic/`
- **Acesso via URL:** `/profilePic/{nome_da_imagem}`
- **Campo no formulário:** `profile_pic`

### Observações Importantes

⚠️ **Nome da Coluna no Banco:** Certifique-se de que a coluna no banco de dados seja `img_pub` (não `img_pub_name`) para compatibilidade com os templates Handlebars.

---

## 🎨 Views e Templates

### Sistema de Templates

O projeto utiliza **Handlebars** como template engine com:
- **Layout principal:** `views/layouts/main.handlebars`
- **Partials:** Componentes reutilizáveis em `views/partials/`
- **Páginas:** Views completas em `views/pages/`

### Páginas Disponíveis

- `login.handlebars` - Tela de login
- `createAccount.handlebars` - Tela de cadastro
- `home.handlebars` - Feed principal com publicações
- `myProfile.handlebars` - Perfil do usuário logado
- `userProfile.handlebars` - Perfil de outros usuários
- `foundProfile.handlebars` - Resultados de busca de usuários
- `emailUsed.handlebars` - Página de erro (email já cadastrado)
- `invalidToken.handlebars` - Página de erro (token inválido)
- `notFound.handlebars` - Página 404


## 🧪 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Produção
npm start
```

### Estrutura de Código

- **MVC Pattern:** Separação clara entre Models, Views e Controllers
- **Middlewares:** Lógica de validação e processamento intermediário
- **Services:** Lógica de negócio reutilizável (autenticação, etc)
- **Modular:** Código organizado por funcionalidade

---

## 🔒 Segurança

### Medidas Implementadas

- ✅ Prepared statements (proteção contra SQL Injection)
- ✅ Senhas criptografadas com bcryptjs (hash + salt)
- ✅ Autenticação baseada em JWT
- ✅ Tokens armazenados em cookies HTTP-only
- ✅ Validação de entrada de dados
- ✅ Verificação de autenticação em rotas protegidas


---

## 📈 Implementações Futuras

- [ ] Sistema de curtidas e comentários em publicações
- [ ] Edição e exclusão de publicações
- [ ] Chat em tempo real
- [ ] Notificações em tempo real
- [ ] Upload de vídeos

---

## 👨‍💻 Saiba mais sobre o desenvolvedor

**Gilberto Lopes**

-   Email: developer.gilberto@gmail.com
-   [Site pessoal](https://gilbertolopes.dev)
-   [LinkedIn](https://linkedin.com/in/gilbertolopes-dev)
-   [GitHub](https://github.com/developer-gilberto)
-   [Instagran](https://www.instagram.com/developer.gilberto/)

---

Exceto conforme expressamente estabelecido de outra forma por escrito, o titular dos direitos autorais deste software e qualquer outra pessoa que controle os direitos autorais reserva todos os direitos a respeito do software distribuído.

Nenhuma permissão é concedida para cópia, distribuição, modificação ou sublicenciamento do software. O uso comercial deste software requer uma licença comercial válida emitida pelo titular dos direitos autorais.

Para obter permissão, entre em contato com o criador e desenvolvedor da Funny® Gilberto Lopes developer.gilberto@gmail.com

## Funny®
### All Rights Reserved ®
### © Copy Right
### Todos os Direitos Reservados
