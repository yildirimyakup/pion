import { Box, Typography, Card, CardContent, Avatar, IconButton, Stack } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Reveal from "../components/Reveal";

const team = [
    { name: "Ahmet Kaya", role: "Kurucu & CEO", img: "https://i.pravatar.cc/150?img=3" },
    { name: "Zeynep Demir", role: "Proje Yöneticisi", img: "https://i.pravatar.cc/150?img=5" },
    { name: "Ali Yılmaz", role: "Yazılım Geliştirici", img: "https://i.pravatar.cc/150?img=7" },
    { name: "Ayşe Kurt", role: "UI/UX Tasarımcı", img: "https://i.pravatar.cc/150?img=8" },
];

const Team = () => {
    return (
        <Box
            id="ekip"
            sx={{
                py: 10,
                background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
            }}
        >
            <Reveal>
                <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
                    Ekibimiz
                </Typography>
            </Reveal>

            <Reveal delay={0.2}>
                <Typography
                    variant="h6"
                    textAlign="center"
                    color="text.secondary"
                    mb={6}
                >
                    Pion Bilişim olarak uzman ve dinamik kadromuzla en iyi hizmeti sunuyoruz.
                </Typography>
            </Reveal>

            {/* ✅ FLEX ile responsive dizayn */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 4,
                }}
            >
                {team.map((member, index) => (
                    <Reveal key={index} delay={index * 0.2}>
                        <Card
                            sx={{
                                textAlign: "center",
                                boxShadow: 4,
                                width: 250,
                                borderRadius: 4,
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-8px) scale(1.05)",
                                    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                                },
                            }}
                        >
                            <CardContent>
                                {/* Avatar */}
                                <Avatar
                                    src={member.img}
                                    sx={{
                                        width: 90,
                                        height: 90,
                                        margin: "auto",
                                        boxShadow: 3,
                                        border: "3px solid white",
                                    }}
                                />

                                {/* İsim ve Görev */}
                                <Typography variant="h6" mt={2} fontWeight="bold">
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={2}>
                                    {member.role}
                                </Typography>

                                {/* Sosyal Medya İkonları */}
                                <Stack direction="row" justifyContent="center" spacing={1}>
                                    <IconButton
                                        size="small"
                                        sx={{ "&:hover": { color: "#0A66C2" } }}
                                    >
                                        <LinkedInIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ "&:hover": { color: "#E4405F" } }}
                                    >
                                        <InstagramIcon />
                                    </IconButton>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Reveal>
                ))}
            </Box>
        </Box>
    );
};

export default Team;
