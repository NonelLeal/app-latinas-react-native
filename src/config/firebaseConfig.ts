// src/config/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Importe se for usar Cloud Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBsA0QEdCyGvXDbZwtrAQDiVFTK8Aa5yw4", // Seus valores reais agora!
  authDomain: "latinas-a05a6.firebaseapp.com",
  projectId: "latinas-a05a6",
  storageBucket: "latinas-a05a6.firebasestorage.app",
  messagingSenderId: "899999734191",
  appId: "1:899999734191:web:8d66f9d1d695771ab9375a",
  measurementId: "G-XEBM2FKGQ2"
};

// Inicializa o Firebase apenas uma vez para evitar erros em Hot Reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app); // Opcional, se usar Cloud Firestore

export { auth, db };