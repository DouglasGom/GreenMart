import { db } from './firebase';  // Importe o Firebase configurado
import { collection, addDoc } from "firebase/firestore";

// Função para adicionar produtos
export async function adicionarProduto() {
  const produtosRef = collection(db, "produtos");

  const produtoData = [
    {
      tipo: "Partes de Cima",
      promocao: 1,
      nome_produto: "Camisa Seleção Brasileira",
      preco_produto: 120.00,
      material_produto: "Poliéster",
      descricao_produto: "O novo uniforme da Seleção Brasileira Feminina...",
      imagem_produto: "https://example.com/imagens/camisa_selecao.jpg"
    },
    {
      tipo: "Saias",
      promocao: 0,
      nome_produto: "Saia Longa",
      preco_produto: 90.00,
      material_produto: "Poliéster",
      descricao_produto: "Saia longa confortável e estilosa...",
      imagem_produto: "https://example.com/imagens/saia_longa.jpg"
    },
    // Adicione mais produtos conforme necessário
  ];

  try {
    for (let produto of produtoData) {
      await addDoc(produtosRef, produto);
    }
    console.log("Produtos inseridos com sucesso!");
  } catch (e) {
    console.error("Erro ao adicionar produto: ", e);
  }
}

// Função para adicionar ONGs
export async function adicionarOng() {
  const ongsRef = collection(db, "ongs");

  const ongData = [
    {
      nome_ong: "Ong Verde",
      descricao_ong: "Ong que promove a sustentabilidade...",
      endereco_ong: "Rua X, 123, Cidade Y",
      imagem_ong: "https://example.com/ong_verde.jpg",
      contato_ong: "contato@ongverde.org"
    },
    {
      nome_ong: "Doe Roupas",
      descricao_ong: "Ong que arrecada roupas para pessoas carentes.",
      endereco_ong: "Avenida Z, 456, Cidade W",
      imagem_ong: "https://example.com/ong_doe_roupas.jpg",
      contato_ong: "contato@doeroupas.org"
    },
    // Adicione mais ONGs conforme necessário
  ];

  try {
    for (let ong of ongData) {
      await addDoc(ongsRef, ong);
    }
    console.log("ONGs inseridas com sucesso!");
  } catch (e) {
    console.error("Erro ao adicionar ONG: ", e);
  }
}

// Função para adicionar vídeos
export async function adicionarVideo() {
  const videosRef = collection(db, "videos");

  const videoData = [
    {
      nome: "+ DE 100 IDEIAS DE TRANSFORMAÇÃO DE ROUPAS",
      descricao: "Com mais de 100 sugestões práticas de DIY...",
      foto: "https://i.ytimg.com/vi/9chk5YiK2GQ/mqdefault.jpg",
      video_url: "https://abrir.link/SXkTb"
    },
    {
      nome: "Receitas Veganas Fáceis",
      descricao: "Aprenda a fazer receitas veganas deliciosas...",
      foto: "https://example.com/fotos/receitas-veganas.jpg",
      video_url: "https://example.com/videos/receitas-veganas.mp4"
    },
    // Adicione mais vídeos conforme necessário
  ];

  try {
    for (let video of videoData) {
      await addDoc(videosRef, video);
    }
    console.log("Vídeos inseridos com sucesso!");
  } catch (e) {
    console.error("Erro ao adicionar vídeo: ", e);
  }
}
