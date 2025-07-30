import { db } from "./config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const settingsRef = doc(db, "settings", "tradeFee");

// ✅ Takas Ücretini Çek
export const getTradeFee = async (): Promise<number> => {
    const snap = await getDoc(settingsRef);
    if (snap.exists()) {
        return snap.data().fee;
    } else {
        await setDoc(settingsRef, { fee: 0 }); // ilk defa oluşturulmuşsa
        return 0;
    }
};

// ✅ Takas Ücretini Güncelle
export const updateTradeFee = async (fee: number) => {
    await updateDoc(settingsRef, { fee });
};
