import { Box, Typography, Button } from "@mui/material";
import Reveal from "../components/Reveal";

const Hero = () => {

    return (
        <Box
            id="hero"
            sx={{
                backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipMu9L5OhGpHr8OBjCGkfIB0EGdE7KuekcrPBvWZ=s1360-w1360-h1020-rw')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                textAlign: "center",
                py: { xs: 8, md: 12 },
                px: 2,
            }}
        >
            <Reveal>
                <Typography variant="h3" fontWeight="bold">
                    Çerkezköy Pion Bilişim
                </Typography>
            </Reveal>
            <Reveal delay={0.2}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Teknoloji ve Yazılım Çözümlerinde Güvenceniz
                </Typography>
            </Reveal>
            <Reveal delay={0.4}>
                <Button variant="contained" color="secondary"  href="#hizmetler" sx={{ mt: 4 }}>
                    Hizmetlerimizi İncele
                </Button>
            </Reveal>
        </Box>
    );
};

export default Hero;
