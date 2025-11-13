# Guia Completo: MongoDB Atlas + Vercel + Seu Projeto

## SEMANA 2: Deploy em Staging e Produção

---

## PASSO 1: Criar Conta no MongoDB Atlas

### 1.1 - Acessar MongoDB Atlas
- Vá para: https://www.mongodb.com/cloud/atlas/register
- Escolha: "Sign up with Google" (mais fácil) OU preencha o formulário
- Complete o email de confirmação

### 1.2 - Criar um Projeto
- Clique em "New Project"
- Nome: `registration-project` (ou seu nome)
- Clique em "Next"

### 1.3 - Criar um Cluster (Banco de Dados)
- Escolha: **FREE** (gratuito)
- Provider: AWS
- Region: **us-east-1** (mais próximo)
- Cluster Name: `Cluster0`
- Clique em "Create"
- **AGUARDE 2-3 minutos** enquanto o cluster é criado

---

## PASSO 2: Configurar Segurança

### 2.1 - Criar Usuário do Banco de Dados
1. No menu esquerdo, clique em **Security → Database Access**
2. Clique em **"+ ADD NEW DATABASE USER"**
3. Preencha:
   - **Authentication Method**: Password
   - **Username**: `admin-user` (escolha um nome)
   - **Password**: Clique em "Autogenerate Secure Password"
   - **COPIE E GUARDE esta senha!**
   - **Built-in Role**: Atlas admin
4. Clique em **"Add User"**

### 2.2 - Liberar IP (para conexão de qualquer lugar)
1. No menu esquerdo, clique em **Security → Network Access**
2. Clique em **"+ ADD IP ADDRESS"**
3. Selecione: **"ALLOW ACCESS FROM ANYWHERE"**
4. Clique em **"Confirm"**
5. Pronto! Seu MongoDB agora está acessível

---

## PASSO 3: Obter a String de Conexão

### 3.1 - Copiar Connection String
1. Clique em **"Database"** (ou "Databases") no menu esquerdo
2. Veja seu cluster **"Cluster0"**
3. Clique no botão **"Connect"**
4. Escolha: **"Drivers"** (ou "Connect your application")
5. Selecione:
   - Language: **Node.js**
   - Version: **4.1 or later**
6. Você verá algo como:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 3.2 - Substituir Valores
Na string acima:
- Substitua `<username>` pela seu usuário (ex: `admin-user`)
- Substitua `<password>` pela sua senha (aquela que você gerou)

**EXEMPLO FINAL:**
```
mongodb+srv://admin-user:minha_senha_secreta_123@cluster0.abc1234.mongodb.net/?retryWrites=true&w=majority
```

---

## PASSO 4: Criar Arquivo .env com Suas Credenciais

### 4.1 - Criar .env Local
Na raiz do seu projeto (`c:\Users\katharyne_bertholdo\Documents\Mongo_vercel\`):

Crie um arquivo chamado `.env` (sim, começa com ponto):

```
MONGODB_URI=mongodb+srv://admin-user:minha_senha_secreta_123@cluster0.abc1234.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=registration_db
```

**IMPORTANTE:**
- Este arquivo `.env` fica apenas em seu computador
- Ele NÃO vai para o GitHub (por causa do `.gitignore`)
- Substitua com seus valores reais!

---

## PASSO 5: Testar Localmente

### 5.1 - Instalar dependências
```bash
npm install
```

### 5.2 - Rodar o projeto localmente
```bash
npm run dev
```

Você verá:
```
> ready - started server on 0.0.0.0:3000
```

### 5.3 - Acessar a página
- Abra: `http://localhost:3000/register`
- Tente fazer um cadastro
- Se funcionar, significa que:
  ✅ Seu .env está carregado
  ✅ Conexão com MongoDB está funcionando
  ✅ Dados estão sendo salvos no banco

---

## PASSO 6: Configurar Vercel

### 6.1 - Acessar Vercel
1. Vá para: https://vercel.com
2. Faça login com GitHub
3. Clique em **"New Project"**

### 6.2 - Importar Repositório
1. Procure por **"Mongo_vercel"**
2. Clique em **"Import"**
3. Em **"Configure Project"**:
   - Root Directory: `./` (deixe como está)
   - Framework: `Next.js` (detecta automaticamente)
   - Clique em **"Environment Variables"**

### 6.3 - Adicionar Secrets (Variáveis de Ambiente)
1. Adicione uma nova variável:
   - **Name**: `MONGODB_URI`
   - **Value**: Cole aquela string de conexão do MongoDB (ex: `mongodb+srv://admin-user:...`)
   - **Environments**: Selecione `Production`, `Preview`, e `Development`
   - Clique em **"Add"**

2. Adicione outra variável:
   - **Name**: `MONGODB_DB`
   - **Value**: `registration_db`
   - **Environments**: Selecione `Production`, `Preview`, e `Development`
   - Clique em **"Add"**

3. Clique em **"Deploy"**

### 6.4 - Aguardar Deploy
A Vercel vai:
- Clonar seu repositório do GitHub
- Instalar dependências
- Fazer build do projeto
- Colocar online

Quando terminar, você verá um URL como: `https://mongo-vercel-xxxxx.vercel.app`

---

## PASSO 7: Testar em Staging

### 7.1 - Acessar seu projeto
1. Vá para o URL que a Vercel forneceu
2. Clique em `/register`
3. Tente fazer um cadastro
4. Se funcionar: ✅ Staging está PERFEITO!

---

## PASSO 8: Fazer o Merge para Produção

### 8.1 - Ir no GitHub
1. Acesse: https://github.com/karemoliveira18/Mongo_vercel
2. Vá para a aba **"Pull requests"**
3. Procure por um PR aberto (ou crie um novo):
   - Clique em **"New pull request"**
   - Compare: `staging` → `main`
   - Título: "Semana 1 e 2: Deploy Completo"
   - Descrição: "Esta é a V1 do projeto, testada em staging e pronta para produção"
   - Clique em **"Create pull request"**

### 8.2 - Revisar e Fazer Merge
1. Se tudo looks bom, clique em **"Merge pull request"**
2. Clique em **"Confirm merge"**
3. Clique em **"Delete branch"** (para staging, se quiser limpar)

### 8.3 - Observar Deploy Automático
1. Volte para Vercel: https://vercel.com
2. Seu projeto detectou o merge na `main`
3. **Automaticamente** iniciou um novo deploy de **PRODUÇÃO**
4. Aguarde 1-2 minutos

### 8.4 - Acessar Produção
- URL de Staging (preview): `https://mongo-vercel-xxxxx.vercel.app`
- URL de Produção (main): `https://mongo-vercel.vercel.app` (ou similar)
- Ambas devem funcionar igual!

---

## RESUMO DO FLUXO COMPLETO

```
LOCAL (seu PC):
├── npm run dev
├── Testa em http://localhost:3000/register
└── Verifica banco de dados

GITHUB (staging):
├── git push origin staging
├── MongoDB Atlas conectado
└── Pronto para testar

VERCEL (Preview/Staging):
├── https://seu-projeto-xxxxx.vercel.app
├── Clona staging do GitHub
└── Usa variáveis de ambiente

GITHUB (main):
├── Pull Request: staging → main
└── Merge ✅

VERCEL (Production):
├── https://seu-projeto.vercel.app
├── Clona main do GitHub
└── Novo deploy automático!
```

---

## Checklist Final

- [ ] MongoDB Atlas conta criada
- [ ] Cluster criado e rodando
- [ ] Usuário do banco criado
- [ ] IP liberado (0.0.0.0/0)
- [ ] .env criado localmente com credenciais
- [ ] Teste local funcionando (npm run dev)
- [ ] Vercel conectada ao GitHub
- [ ] Environment Variables adicionadas em Vercel
- [ ] Deploy em Preview/Staging feito
- [ ] Teste em staging funcionando
- [ ] Pull Request criado (staging → main)
- [ ] Merge feito na main
- [ ] Deploy de Produção automático feito
- [ ] Teste em produção funcionando

---

**Desenvolvido para**: Semana de Imersão DevOps
**Data**: Novembro de 2025
**Próxima Etapa**: Documento final com respostas do Copilot
