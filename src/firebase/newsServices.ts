import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import {query, where } from "firebase/firestore";

const newsCollection = collection(db, "news");

// Haber ekle
export const addNews = async (title: string, content: string) => {
    return await addDoc(newsCollection, {
        title,
        content,
        isPublished: false,
        createdAt: new Date(),
    });
};

// Haberleri getir
export const getAllNews = async () => {
    const snapshot = await getDocs(newsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Haber sil
export const deleteNews = async (id: string) => {
    return await deleteDoc(doc(db, "news", id));
};

// Haber güncelle (başlık, içerik, yayında olma durumu vs.)
export const updateNews = async (id: string, data: any) => {
    return await updateDoc(doc(db, "news", id), data);
};
export const getPublishedNews = async () => {
    const q = query(newsCollection, where("isPublished", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};