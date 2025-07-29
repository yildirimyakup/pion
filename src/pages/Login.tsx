import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../firebase/auth";
import {
    Box, Button, Card, CardContent, TextField, Typography, Alert
} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginAdmin(email, password);
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } catch (err :any) {
            setError("Giriş başarısız! Email veya şifre hatalı.");
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <Card sx={{ width: 400, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" mb={2} fontWeight="bold">
                        🔐 Admin Girişi
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
                        <TextField
                            label="E-posta"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Şifre"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Giriş Yap
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
