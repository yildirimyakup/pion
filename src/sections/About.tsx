import { Box, Typography, Paper } from "@mui/material";
import SecurityCameraIcon from "@mui/icons-material/Videocam";
import GamepadIcon from "@mui/icons-material/SportsEsports";
import ComputerIcon from "@mui/icons-material/Computer";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FlagIcon from "@mui/icons-material/Flag";
import Reveal from "../components/Reveal";

const About = () => {
    return (
        <Box id="hakkimizda" sx={{ py: 10, background: "linear-gradient(to bottom, #f5f5f5, #ffffff)" }}>

                {/* 🔹 Başlık ve Giriş */}
                <Reveal>
                    <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
                        Pion Bilişim Hakkında
                    </Typography>
                </Reveal>

                <Reveal delay={0.2}>
                    <Typography variant="h6" textAlign="center" color="text.secondary" mb={6} maxWidth="800px" mx="auto">
                        2010’dan bu yana Çerkezköy’den yola çıkarak Tekirdağ ve çevre illerde
                        teknolojiye yön veriyoruz. Güvenlik sistemlerinden konsol tamirine, bilgisayar
                        bakımından format çözümlerine kadar **her alanda yanınızdayız.**
                    </Typography>
                </Reveal>

                {/* 🔹 3 Hizmet Kartı */}
            {/* 🔹 3 Hizmet Kartı */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "center",
                    mb: 8
                }}
            >
                {/* 1. Kart */}
                <Reveal delay={0.3}>
                    <Paper sx={{
                        flex: "1 1 300px",   // minimum 300px genişlik, gerekirse küçülür
                        maxWidth: "350px",
                        p: 4,
                        textAlign: "center",
                        boxShadow: 4,
                        borderRadius: 3
                    }}>
                        <SecurityCameraIcon sx={{ fontSize: 50, color: "primary.main" }} />
                        <Typography variant="h6" mt={2} fontWeight="bold">
                            Kamera Kurulumu
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            IP, CCTV ve güvenlik sistemleri ile ev ve iş yerlerinizi **güvenli** hale getiriyoruz.
                        </Typography>
                    </Paper>
                </Reveal>

                {/* 2. Kart */}
                <Reveal delay={0.4}>
                    <Paper sx={{
                        flex: "1 1 300px",
                        maxWidth: "350px",
                        p: 4,
                        textAlign: "center",
                        boxShadow: 4,
                        borderRadius: 3
                    }}>
                        <GamepadIcon sx={{ fontSize: 50, color: "secondary.main" }} />
                        <Typography variant="h6" mt={2} fontWeight="bold">
                            Konsol Tamiri & Bakımı
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            PS3, PS4, Xbox gibi cihazların **bakım, tamir ve güncellemelerini** profesyonelce yapıyoruz.
                        </Typography>
                    </Paper>
                </Reveal>

                {/* 3. Kart */}
                <Reveal delay={0.5}>
                    <Paper sx={{
                        flex: "1 1 300px",
                        maxWidth: "350px",
                        p: 4,
                        textAlign: "center",
                        boxShadow: 4,
                        borderRadius: 3
                    }}>
                        <ComputerIcon sx={{ fontSize: 50, color: "primary.main" }} />
                        <Typography variant="h6" mt={2} fontWeight="bold">
                            PC Bakım & Format
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            Bilgisayarlarınızı ilk günkü performansına döndürüyor, **7/24 teknik destek** sağlıyoruz.
                        </Typography>
                    </Paper>
                </Reveal>
            </Box>

            {/* 🔹 Vizyon & Misyon Kutuları */}
            {/* 🔹 Vizyon & Misyon Kutuları */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "center",
                    py: 6,
                    px: 2,
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),
                      url('https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-outline.png')`,
                    backgroundSize: "400px",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat"
                }}
            >
                {/* Vizyonumuz */}
                <Reveal delay={0.6}>
                    <Paper
                        sx={{
                            flex: "1 1 320px",
                            maxWidth: "500px",
                            p: 4,
                            backgroundColor: "#e3f2fd",
                            borderRadius: 3,
                            boxShadow: 3
                        }}
                    >
                        <Box display="flex" alignItems="center" mb={2}>
                            <LightbulbIcon sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />
                            <Typography variant="h5" fontWeight="bold">Vizyonumuz</Typography>
                        </Box>
                        <Typography variant="body1">
                            Teknoloji ve bilişim alanında **Çerkezköy’den tüm Türkiye’ye yayılan**,
                            yenilikçi çözümler sunan lider bir marka olmak.
                        </Typography>
                    </Paper>
                </Reveal>

                {/* Misyonumuz */}
                <Reveal delay={0.8}>
                    <Paper
                        sx={{
                            flex: "1 1 320px",
                            maxWidth: "500px",
                            p: 4,
                            backgroundColor: "#fff3e0",
                            borderRadius: 3,
                            boxShadow: 3
                        }}
                    >
                        <Box display="flex" alignItems="center" mb={2}>
                            <FlagIcon sx={{ fontSize: 40, color: "secondary.main", mr: 1 }} />
                            <Typography variant="h5" fontWeight="bold">Misyonumuz</Typography>
                        </Box>
                        <Typography variant="body1">
                            Her müşterimize **kesintisiz destek**, kaliteli hizmet ve uzun vadeli güven sunarak,
                            işletmelerin ve bireylerin dijital dönüşümünü kolaylaştırmak.
                        </Typography>
                    </Paper>
                </Reveal>
            </Box>



        </Box>
    );
};

export default About;
