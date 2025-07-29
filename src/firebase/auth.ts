import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

export const loginAdmin = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutAdmin = async () => {
    return signOut(auth);
};
