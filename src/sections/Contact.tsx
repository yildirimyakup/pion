import { Box, Typography, Container, Paper, Stack } from "@mui/material";
import Reveal from "../components/Reveal.tsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
    return (
        <Box
            id="iletisim"
            sx={{
                py: 10,
                background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
            }}
        >
            <Container>
                {/* Başlık */}
                <Reveal>
                    <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
                        İletişim
                    </Typography>
                </Reveal>

                <Reveal delay={0.2}>
                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="text.secondary"
                        mb={6}
                    >
                        Sorularınız, projeleriniz veya teknik destek için bize her zaman
                        ulaşabilirsiniz.
                    </Typography>
                </Reveal>

                {/* 🔹 FLEX WRAPPER */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",     // Küçük ekranda alt alta geçer
                        gap: 4,
                        justifyContent: "center",
                        alignItems: "stretch"
                    }}
                >
                    {/* 📌 Sol Taraf: İletişim Bilgileri */}
                    <Stack spacing={3} sx={{ flex: "1 1 350px", maxWidth: "500px" }}>
                        <Reveal delay={0.3}>
                            <Paper
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 3,
                                    boxShadow: 4,
                                    borderRadius: 3,
                                    transition: "transform 0.3s ease",
                                    "&:hover": { transform: "scale(1.03)" },
                                }}
                            >
                                <LocationOnIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">Adres</Typography>
                                    <Typography color="text.secondary">
                                        Gazi Osman Paşa Mah. Çerkezköy / Tekirdağ
                                    </Typography>
                                </Box>
                            </Paper>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <Paper
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 3,
                                    boxShadow: 4,
                                    borderRadius: 3,
                                    transition: "transform 0.3s ease",
                                    "&:hover": { transform: "scale(1.03)" },
                                }}
                            >
                                <PhoneIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">Telefon</Typography>
                                    <Typography color="text.secondary">
                                        +90 532 123 45 67
                                    </Typography>
                                </Box>
                            </Paper>
                        </Reveal>

                        <Reveal delay={0.5}>
                            <Paper
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 3,
                                    boxShadow: 4,
                                    borderRadius: 3,
                                    transition: "transform 0.3s ease",
                                    "&:hover": { transform: "scale(1.03)" },
                                }}
                            >
                                <EmailIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6">E-posta</Typography>
                                    <Typography color="text.secondary">
                                        info@pionbilisim.com
                                    </Typography>
                                </Box>
                            </Paper>
                        </Reveal>
                    </Stack>

                    {/* 📍 Sağ Taraf: Google Maps */}
                    <Reveal delay={0.6}>
                        <Paper
                            sx={{
                                flex: "1 1 350px",
                                maxWidth: "600px",
                                overflow: "hidden",
                                borderRadius: 3,
                                boxShadow: 4,
                                height: "100%",
                                minHeight: "350px"
                            }}
                        >
                            <iframe
                                title="Google Maps"
                                src="https://maps.google.com/maps?q=Çerkezköy&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                            ></iframe>
                        </Paper>
                    </Reveal>
                </Box>
            </Container>
        </Box>
    );
};

export default Contact;
