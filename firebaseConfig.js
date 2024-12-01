// Importa a função do Firestore
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 

// Inicializa o Firebase com a configuração
import { initializeApp } from "firebase/app";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXaLF0rYOdXL0dTm9gcgowe7rk_pHGNF8",
  authDomain: "greenmart-database.firebaseapp.com",
  databaseURL: "https://greenmart-database-default-rtdb.firebaseio.com",
  projectId: "greenmart-database",
  storageBucket: "greenmart-database.firebasestorage.app",
  messagingSenderId: "974151855924",
  appId: "1:974151855924:web:fc224d0099f7460873bf61",
  measurementId: "G-JJEFW3PYP2"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app); // Adiciona esta linha

export { db }; // Exporte a referência do Firestore para usar em outras partes do app
