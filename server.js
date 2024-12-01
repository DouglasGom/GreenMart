const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar o Firebase Admin
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Remover a linha databaseURL para Firestore
});

// Inicializar Firestore
const db = admin.firestore();

// Configuração do servidor
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', // Ajuste conforme o IP ou domínio do seu app
}));

// Rota para registrar usuário
app.post('/register', async (req, res) => {
  const { nome_usuario, email, senha, cpf, telefone, endereco_fisico } = req.body;

  if (!nome_usuario || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password: senha,
      displayName: nome_usuario,
    });

    await db.collection('users').doc(userRecord.uid).set({
      nome_usuario,
      email,
      cpf,
      telefone,
      endereco_fisico,
      greencoins: 0,
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota para login
app.post('/login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório!' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    const userDoc = await db.collection('users').doc(user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', user: userDoc.data() });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Rota para buscar perfil do usuário
app.get('/perfil', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório!' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    const userDoc = await db.collection('users').doc(user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil!' });
  }
});

// Rota para atualizar perfil
app.post('/update-profile', async (req, res) => {
  const { email, nome_usuario, cpf, telefone, endereco_fisico } = req.body;

  if (!email || !nome_usuario || !cpf || !telefone || !endereco_fisico) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);

    await db.collection('users').doc(user.uid).update({
      nome_usuario,
      cpf,
      telefone,
      endereco_fisico,
    });

    res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil!' });
  }
});

// Rota para buscar saldo de Greencoins
app.get('/greencoins', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    const userDoc = await db.collection('users').doc(user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ greencoins: userDoc.data().greencoins });
  } catch (error) {
    console.error('Erro ao buscar saldo de Greencoins:', error);
    res.status(500).json({ message: 'Erro ao buscar saldo de Greencoins!' });
  }
});

// Rota para atualizar saldo de Greencoins
app.post('/update-greencoins', async (req, res) => {
  const { email, greencoins } = req.body;

  if (!email || greencoins === undefined) {
    return res.status(400).json({ message: 'Email e quantidade de Greencoins são obrigatórios!' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);

    await db.collection('users').doc(user.uid).update({
      greencoins: admin.firestore.FieldValue.increment(greencoins),
    });

    res.status(200).json({ message: 'Greencoins atualizados com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar Greencoins:', error);
    res.status(500).json({ message: 'Erro ao atualizar Greencoins!' });
  }
});

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
