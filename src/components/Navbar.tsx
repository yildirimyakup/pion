import { AppBar, Toolbar, Button, Box } from "@mui/material";
import logo from "../assets/logoo.png";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [elevate, setElevate] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setElevate(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AppBar
            position="fixed"
            color="primary"
            elevation={elevate ? 4 : 0}
            sx={{
                transition: "all 0.3s ease",
                backgroundColor: elevate ? "primary.main" : "transparent",
            }}
        >
            <Toolbar sx={{ maxWidth: "1200px", margin: "auto", width: "100%" }}>
                {/* LOGO */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <img src={logo} alt="Pion Bilişim" style={{ height: 40, marginRight: 10 }} />

                </Box>

                {/* Menü Butonları */}
                <Button color="inherit" href="#hero">Anasayfa</Button>
                <Button color="inherit" href="#hizmetler">Hizmetlerimiz</Button>
                <Button color="inherit" href="#hakkimizda">Hakkımızda</Button>
                <Button color="inherit" href="#ekip">Ekibimiz</Button>
                <Button color="inherit" href="#yorum">Yorumlar</Button>
                <Button color="inherit" href="#haberler">Haberler</Button>
                <Button color="inherit" href="#iletisim">İletişim</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
