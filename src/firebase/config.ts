import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 BURAYA kendi Firebase Config değerlerini koyacağız
const firebaseConfig = {
    apiKey: "AIzaSyBzAa6SDzm7s_QckMcj-Jvl19G6tJYTTbI",
    authDomain: "pion-42519.firebaseapp.com",
    projectId: "pion-42519",
    storageBucket: "pion-42519.firebasestorage.app",
    messagingSenderId: "104668647745",
    appId: "1:104668647745:web:a39c7e029848498eead1c0",
    measurementId: "G-HPZT6D49HW"
};

const app = initializeApp(firebaseConfig);

// Servisleri export et
export const auth = getAuth(app);
export const db = getFirestore(app);
