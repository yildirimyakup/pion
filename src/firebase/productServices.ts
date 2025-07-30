import { db } from "./config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import {  query, where } from "firebase/firestore";

// ✅ ÜRÜNLERİ ÇEK
export const getProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map(docu => ({ id: docu.id, ...docu.data() }));
};

// ✅ ÜRÜN EKLE
export const addProduct = async (product: {
    name: string;
    price: number;
    stock: number;
    podyum: boolean;
    image: string;
}) => {
    await addDoc(collection(db, "products"), {
        ...product,
        createdAt: new Date()
    });
};

// ✅ ÜRÜN GÜNCELLE
export const updateProduct = async (id: string, updatedData: Partial<any>) => {
    const ref = doc(db, "products", id);
    await updateDoc(ref, updatedData);
};

// ✅ ÜRÜN SİL
export const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
};

// 🔹 Podyum ürünlerini çek
export const getPodyumProducts = async () => {
    const q = query(collection(db, "products"), where("podyum", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
