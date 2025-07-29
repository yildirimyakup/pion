import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import type {JSX} from "react";

interface Props {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <p>Yükleniyor...</p>;
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
