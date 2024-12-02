const admin = require("firebase-admin");
const fs = require("fs");


const serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const dados = JSON.parse(fs.readFileSync("produtos.json", "utf8")); // Ler o arquivo
const produtos = dados.produtos; 


const inserirProdutos = async () => {
  const colecao = db.collection("produtos");

  for (const produto of produtos) {

    const docRef = colecao.doc();


    await docRef.set(produto);
    console.log(`Produto "${produto.nome_produto}" inserido com sucesso!`);
  }
};


inserirProdutos()
  .then(() => {
    console.log("Todos os produtos foram inseridos!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Erro ao inserir produtos:", error);
    process.exit(1);
  });
