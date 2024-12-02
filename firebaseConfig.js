import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 

import { initializeApp } from "firebase/app";

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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 

export { db }; 
