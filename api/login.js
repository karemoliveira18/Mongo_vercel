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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { email, senha } = req.body || {};
    if (!email || !senha) {
      res.status(400).json({ error: 'email e senha são obrigatórios' });
      return;
    }

    const client = await getMongoClient();
    const senhaHasheada = simularHash(senha);

    if (client) {
      const dbName = process.env.MONGODB_DB || undefined;
      const db = dbName ? client.db(dbName) : client.db();
      const coll = db.collection('usuarios');

      const user = await coll.findOne({ email });
      if (!user) {
        res.status(401).json({ ok: false, error: 'Usuário não encontrado' });
        return;
      }

      if (String(user.senhaHasheada) === senhaHasheada) {
        res.status(200).json({ ok: true, user: { email: user.email, nome: user.nome } });
      } else {
        res.status(401).json({ ok: false, error: 'Senha incorreta' });
      }
      return;
    }

    const user = inMemoryUsers.find(u => u.email === email);
    if (!user) {
      res.status(401).json({ ok: false, error: 'Usuário não encontrado (in-memory)' });
      return;
    }

    if (user.senhaHasheada === senhaHasheada) {
      res.status(200).json({ ok: true, user: { email: user.email, nome: user.nome } });
    } else {
      res.status(401).json({ ok: false, error: 'Senha incorreta (in-memory)' });
    }
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ error: 'Erro interno' });
  }
};
