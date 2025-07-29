import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ComputerIcon from "@mui/icons-material/Computer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Reveal from "../components/Reveal.tsx";

const services = [
    {
        icon: <VideocamIcon sx={{ fontSize: 60, color: "primary.main" }} />,
        title: "Kamera Kurulumu",
        desc: "IP, CCTV ve güvenlik sistemleri ile ev ve iş yerlerinizi güvenli hale getiriyoruz."
    },
    {
        icon: <SportsEsportsIcon sx={{ fontSize: 60, color: "secondary.main" }} />,
        title: "Konsol Tamiri & Bakımı",
        desc: "PS3, PS4,PS5, Xbox gibi cihazların bakım, tamir ve güncellemelerini profesyonelce yapıyoruz."
    },
    {
        icon: <ComputerIcon sx={{ fontSize: 60, color: "primary.main" }} />,
        title: "PC Bakım & Format",
        desc: "Bilgisayarlarınızı ilk günkü performansına döndürüyor, tam bakım ve format hizmeti sağlıyoruz."
    },
    {
        icon: <SupportAgentIcon sx={{ fontSize: 60, color: "secondary.main" }} />,
        title: "7/24 Teknik Destek",
        desc: "İşletmenizin tüm teknik ihtiyaçlarında günün her saati yanınızdayız."
    }
];

const Services = () => {
    return (
        <Box
            id="hizmetler"
            sx={{
                py: 10,
                textAlign: "center",
                background: "linear-gradient(to bottom, #ffffff, #f9f9f9)"
            }}
        >
            {/* 🔹 Başlık */}
            <Reveal>
                <Typography variant="h3" fontWeight="bold" mb={2}>
                    Hizmetlerimiz
                </Typography>
            </Reveal>

            <Reveal delay={0.2}>
                <Typography variant="h6" color="text.secondary" mb={6} maxWidth="700px" mx="auto">
                    Pion Bilişim olarak kamera kurulumundan konsol tamirine, bilgisayar bakımından 7/24 desteğe kadar
                    geniş bir yelpazede profesyonel hizmet sunuyoruz.
                </Typography>
            </Reveal>

            {/* 🔹 Hizmet Kartları */}
            <Grid container spacing={4} justifyContent="center">
                {services.map((service, index) => (
                    <Grid sx={{xs:12,sm:6,md:3}} key={index}>
                        <Reveal delay={index * 0.2}>
                            <Card
                                sx={{
                                    boxShadow: 4,
                                    height: "100%",
                                    borderRadius: 4,
                                    p: 2,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px) scale(1.03)",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
                                    }
                                }}
                            >
                                <CardContent sx={{ textAlign: "center" }}>
                                    {service.icon}
                                    <Typography variant="h6" mt={2} fontWeight="bold">
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" mt={1} color="text.secondary">
                                        {service.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Reveal>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Services;
