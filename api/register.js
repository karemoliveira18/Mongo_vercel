const { MongoClient } = require('mongodb');

const inMemoryUsers = global.__IN_MEMORY_USERS_REG__ || (global.__IN_MEMORY_USERS_REG__ = []);

let cachedClient = null;
async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return cachedClient;
}

function simularHash(senha) {
  const salt = 2024;
  let acc = 0;
  for (let i = 0; i < senha.length; i++) acc += senha.charCodeAt(i);
  return String(acc + salt);
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { nome, email, senha } = req.body || {};
    if (!nome || !email || !senha) {
      res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
      return;
    }

    if (!validarEmail(email)) {
      res.status(400).json({ error: 'Email inválido' });
      return;
    }

    const client = await getMongoClient();
    const senhaHasheada = simularHash(senha);

    if (client) {
      const dbName = process.env.MONGODB_DB || undefined;
      const db = dbName ? client.db(dbName) : client.db();
      const coll = db.collection('usuarios');

      const existente = await coll.findOne({ email });
      if (existente) {
        res.status(409).json({ error: 'Email já cadastrado' });
        return;
      }

      const doc = {
        nome,
        email,
        senhaHasheada,
        dataCriacao: new Date()
      };

      await coll.insertOne(doc);
      res.status(201).json({ ok: true, user: { nome: doc.nome, email: doc.email, dataCriacao: doc.dataCriacao } });
      return;
    }

    const exists = inMemoryUsers.find(u => u.email === email);
    if (exists) {
      res.status(409).json({ error: 'Email já cadastrado (in-memory)' });
      return;
    }

    const newUser = { nome, email, senhaHasheada, dataCriacao: new Date() };
    inMemoryUsers.push(newUser);
    res.status(201).json({ ok: true, user: { nome: newUser.nome, email: newUser.email, dataCriacao: newUser.dataCriacao } });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ error: 'Erro interno' });
  }
};
