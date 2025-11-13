# 🚀 Mongo_vercel - Projeto DevOps com MongoDB + Next.js + Vercel

## 📋 Resumo do Projeto

Este é um **projeto educacional completo** de DevOps que simula um ciclo de desenvolvimento profissional:
- ✅ **Semana 1**: Planejamento, POO e Branching
- ✅ **Semana 2**: Segurança, Deploy em Staging e Produção

---

## 📁 Estrutura do Projeto

```
Mongo_vercel/
├── pages/
│   ├── register.js          # Página de registro (React + validações)
│   └── api/
│       └── register.js      # API endpoint para MongoDB
├── models/
│   └── User.js              # Classe User (POO com comentários)
├── package.json             # Dependências (Next.js, React, MongoDB)
├── .env                     # Variáveis de ambiente (LOCAL - não envia para GitHub)
├── .env.example             # Template de .env (para compartilhar)
├── .gitignore               # Diz ao Git quais arquivos ignorar
│
├── EXPLICACOES_POO_COPILOT.md         # Conceitos de POO explicados
├── EXPLICACAO_ENV_GITIGNORE.md        # Por que .env deve estar em .gitignore
├── GUIA_MONGODB_VERCEL.md             # Passo a passo: MongoDB + Vercel
├── DOCUMENTO_FINAL_DEVOPS.md          # Resposta completa do prompt DevOps
└── README.md                           # Este arquivo
```

---

## 🎯 O que Você Aprenderá

### Programação (POO)
- ✅ **Classes e Instâncias**: Como criar templates de objetos
- ✅ **Constructor**: Inicializador automático de objetos
- ✅ **this**: Referência à instância específica
- ✅ **Métodos**: Funções que pertencem a uma classe
- ✅ **Métodos Estáticos**: Funções da classe, não da instância
- ✅ **Serialização**: Converter objetos para JSON

### Banco de Dados
- ✅ **MongoDB NoSQL**: Alternativa ao SQL tradicional
- ✅ **MongoDB Atlas**: Serviço gratuito em nuvem
- ✅ **Documentos JSON**: Como dados são armazenados
- ✅ **Queries Básicas**: Inserir, ler, atualizar, deletar

### DevOps & Engenharia de Software
- ✅ **Branching**: main (produção) vs staging (testes)
- ✅ **Pull Requests**: Revisão antes de colocar em produção
- ✅ **.env e .gitignore**: Gerenciamento de secrets
- ✅ **CI/CD**: Deploy automático com Vercel
- ✅ **Environment Variables**: Secrets na Vercel
- ✅ **Git Workflow**: Fluxo profissional de desenvolvimento

---

## 🚀 Como Começar

### Passo 1: Clone o Repositório
```bash
git clone https://github.com/karemoliveira18/Mongo_vercel.git
cd Mongo_vercel
```

### Passo 2: Instale Dependências
```bash
npm install
```

### Passo 3: Configure o MongoDB Atlas
1. Vá para https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster
4. Crie um usuário e libere acesso de qualquer IP
5. Copie a connection string

### Passo 4: Crie o Arquivo .env
```bash
# Na raiz do projeto, crie um arquivo chamado .env
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=registration_db
```

### Passo 5: Teste Localmente
```bash
npm run dev
```
Acesse: http://localhost:3000/register

### Passo 6: Deploy na Vercel
1. Vá para https://vercel.com
2. Conecte seu GitHub
3. Importe o projeto
4. Adicione Environment Variables:
   - `MONGODB_URI` = sua connection string
   - `MONGODB_DB` = registration_db
5. Deploy!

---

## 📚 Documentação Incluída

### 1. **EXPLICACOES_POO_COPILOT.md**
Explicações detalhadas sobre:
- O que é uma classe?
- O que é o keyword `this`?
- Diferença entre métodos de instância e estáticos
- Serialização (toDocument)
- Encapsulamento
- Ciclo de vida do usuário no app

### 2. **EXPLICACAO_ENV_GITIGNORE.md**
Respostas DO COPILOT para:
- "Por que .env deve estar em .gitignore?"
- "O que acontece se eu subir .env para GitHub?"
- Cenários de segurança (o que fazer e o que não fazer)
- Diferenças entre local, GitHub e Vercel

### 3. **GUIA_MONGODB_VERCEL.md**
Passo a passo:
- Criar conta MongoDB Atlas
- Configurar banco de dados
- Obter connection string
- Criar arquivo .env
- Configurar Vercel
- Deploy em staging e produção

### 4. **DOCUMENTO_FINAL_DEVOPS.md**
Resposta completa ao prompt do professor:
1. Diferença entre staging e main
2. O que é Pull Request?
3. .env e .gitignore e segurança
4. Environment Variables na Vercel
5. O que Vercel faz com push vs merge
6. CI/CD explicado

---

## 🔄 Fluxo de Desenvolvimento

```
1. TRABALHO LOCAL (seu PC)
   └── npm run dev → teste em localhost:3000

2. PUSH PARA STAGING
   └── git push origin staging → Vercel faz preview deployment

3. TESTE EM STAGING
   └── Acesse https://seu-projeto-xxxxx.vercel.app

4. CRIAR PULL REQUEST
   └── No GitHub, compare staging → main

5. REVISAR CÓDIGO
   └── Você ou seu professor revisa

6. MERGE PARA MAIN
   └── Clica "Merge Pull Request"

7. DEPLOY AUTOMÁTICO EM PRODUÇÃO
   └── Vercel detecta merge e faz deploy em produção

8. ACESSO PÚBLICO
   └── Seu projeto está em https://seu-projeto.vercel.app
```

---

## 🔐 Segurança

### O Que Você NÃO Deve Fazer
❌ Committar .env para GitHub
❌ Compartilhar suas senhas em emails/chats
❌ Usar a mesma senha para múltiplos serviços
❌ Publicar suas API keys no código

### O Que Você DEVE Fazer
✅ Adicionar .env ao .gitignore
✅ Usar Environment Variables na Vercel
✅ Revisar seu código antes de fazer merge
✅ Usar senhas fortes e diferentes

---

## 📖 Estrutura das Classes

### User.js
```javascript
class User {
    constructor(name, email, password) { }
    isValid() { }                        // Valida dados
    toDocument() { }                     // Serializa para JSON
    static fromDocument(data) { }        // Desserializa do banco
}
```

### register.js (API)
```javascript
// POST /api/register
// Recebe: { name, email, password }
// Retorna: { message: "User registered successfully" }
```

### pages/register.js (Frontend)
```javascript
// Formulário React com:
// - Captura de dados (useState)
// - Validação (User.isValid())
// - Envio para API (fetch)
// - Mensagens de sucesso/erro
```

---

## 🧪 Testando o Projeto

### Local
```bash
npm run dev
# Acesse http://localhost:3000/register
# Preencha o formulário
# Verifique se os dados foram salvos no MongoDB Atlas
```

### Staging (Vercel Preview)
```bash
git push origin staging
# Espere Vercel fazer deploy
# Acesse https://seu-projeto-xxxxx.vercel.app
# Teste a funcionalidade
```

### Produção (Vercel)
```bash
# Merge staging → main no GitHub
# Vercel automaticamente faz deploy
# Acesse https://seu-projeto.vercel.app
```

---

## 🐛 Troubleshooting

### "MongoDB connection error"
**Solução**: Verifique se:
- [ ] .env existe com MONGODB_URI correto
- [ ] MongoDB Atlas está rodando
- [ ] IP foi liberado (0.0.0.0/0)
- [ ] Usuário e senha estão corretos

### "Environment Variables undefined em Vercel"
**Solução**: Verifique se:
- [ ] Variáveis foram adicionadas no painel Vercel
- [ ] Foram associadas ao ambiente correto (Production, Preview)
- [ ] Vercel foi redeploy depois de adicionar variáveis

### "Arquivo .env foi para GitHub"
**Solução EMERGENCIAL**:
```bash
# 1. Mude sua senha no MongoDB Atlas AGORA
# 2. Remove do históório
git rm --cached .env
echo ".env" >> .gitignore
git add .
git commit -m "Remove .env from history"
git push origin staging
```

---

## 📋 Entregáveis da Avaliação

### Semana 1
- ✅ Documento Pesquisa (PDF com análise de frameworks)
- ✅ GitHub com branch staging e código comentado
- ✅ Classes de POO com explicações do Copilot
- ✅ Pull Request criado (sem merge)

### Semana 2
- ✅ MongoDB Atlas configurado
- ✅ .env e .gitignore funcionando
- ✅ Deploy em staging (Vercel Preview)
- ✅ Deploy em produção (Merge automático)
- ✅ Documento final com respostas do prompt DevOps

---

## 🎓 O Que Cai na Prova

A prova será **teórica** e baseará em:

1. **Conceitos de POO**
   - O que é uma classe?
   - Para que serve o constructor?
   - Como usar this?
   - Diferença entre métodos e propriedades?

2. **Branching e Git Workflow**
   - Por que separar main e staging?
   - O que é um Pull Request?
   - Por que revisar código antes de merge?

3. **Segurança**
   - Por que .env é secreto?
   - O que acontece se vazar .env?
   - Como Vercel usa Environment Variables?

4. **CI/CD**
   - O que é integração contínua?
   - O que é deploy contínuo?
   - Como Vercel automatiza tudo?

**DICA**: Use os documentos deste projeto como referência!

---

## 🔗 Links Importantes

- **GitHub**: https://github.com/karemoliveira18/Mongo_vercel
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Documentação Next.js**: https://nextjs.org/docs
- **Git Documentation**: https://git-scm.com/doc

---

## 👨‍💻 Desenvolvido Por

**Aluno**: Você!
**Professor**: Seu Professor
**Assistente**: GitHub Copilot
**Data**: Novembro de 2025
**Objetivo**: Dominar DevOps, POO e Banco de Dados

---

## 📝 Notas Finais

Este projeto é um **simulador real** de como empresas desenvolvem software:

```
PROFISSIONAL                    VOCÊ (NESTE PROJETO)
├── Usa Git/GitHub              ✅ Usando Git + GitHub
├── Trabalha em branches         ✅ Staging e main
├── Faz code review (PR)         ✅ Pull Requests
├── Testa antes de produção      ✅ Teste em staging
├── Deploy automático (CI/CD)    ✅ Vercel faz isso
├── Gerencia secrets (.env)      ✅ .env + Vercel secrets
├── Trabalha com banco de dados  ✅ MongoDB
└── Documenta tudo               ✅ Arquivos .md
```

**A diferença**: Você agora sabe COMO e POR QUE isso é feito assim!

---

Boa sorte na imersão DevOps! 🚀
