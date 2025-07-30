import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Box } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// 📂 Modüller
import NewsManager from "../admin/NewsManager";
import ProductManager from "../admin/ProductManager";
import TradeSettings from "../admin/TradeSettings";

const Admin = () => {
    const [tab, setTab] = useState(0);

    // 🚪 Çıkış
    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = "/login";
    };

    return (
        <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
            {/* 🔹 Üst Bar */}
            <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight="bold">
                        📊 Admin Paneli
                    </Typography>
                    <Button
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        color="inherit"
                    >
                        Çıkış Yap
                    </Button>
                </Toolbar>
            </AppBar>

            {/* 🔹 Sekme Menüsü */}
            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                centered
                sx={{ bgcolor: "#fff", boxShadow: 1 }}
            >
                <Tab label="📰 Haber Yönetimi" />
                <Tab label="📦 Ürün Yönetimi" />
                <Tab label="⚙️ Takas Ayarları" />
            </Tabs>

            {/* 🔹 İçerik */}
            <Box sx={{ p: 3, width:"100%",justifyContent: "center", alignItems: "center" }}>
                {tab === 0 && <NewsManager />}
                {tab === 1 && <ProductManager />}
                {tab === 2 && <TradeSettings />}
            </Box>
        </Box>
    );
};

export default Admin;
