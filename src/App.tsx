import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import "swiper/css";
import "swiper/css/pagination";

function App() {
    return (
        <div className="app">


            <Routes>
                <Route path="/" element={<><Navbar /><Home /></>} />
                <Route path="/login" element={<><Navbar /><Login /></>} />

                {/* Protected Route ile Admin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
