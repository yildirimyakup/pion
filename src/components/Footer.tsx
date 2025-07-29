import { Box, Typography, IconButton, Stack, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Reveal from "./Reveal";

const Footer = () => {
    return (
        <Reveal direction="up">
            <Box component="footer">
                {/* 🔹 ÜST KISIM – 3 Sütun Layout */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #0D47A1, #1565C0)",
                        color: "white",
                        px: { xs: 3, md: 8 },
                        py: 6,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "center", md: "flex-start" },
                        gap: 4,
                    }}
                >
                    {/* ✅ 1. Sütun – Logo / Firma Adı / Sosyal Medya */}
                    <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
                        <Typography variant="h5" fontWeight="bold" mb={1}>
                            Pion Bilişim
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.8)" mb={2} sx={{ maxWidth: 250 }}>
                            2010’dan bu yana Çerkezköy ve çevresinde teknoloji çözümleri sunuyoruz.
                        </Typography>

                        {/* 🌐 Sosyal Medya */}
                        <Stack direction="row" spacing={1} justifyContent={{ xs: "center", md: "flex-start" }}>
                            <IconButton
                                href="https://linkedin.com/company/pionbilisim"
                                target="_blank"
                                sx={{
                                    color: "white",
                                    transition: "transform 0.3s ease, color 0.3s ease",
                                    "&:hover": { color: "#0A66C2", transform: "scale(1.2)" },
                                }}
                            >
                                <LinkedInIcon />
                            </IconButton>

                            <IconButton
                                href="https://instagram.com/pionbilisim"
                                target="_blank"
                                sx={{
                                    color: "white",
                                    transition: "transform 0.3s ease, color 0.3s ease",
                                    "&:hover": { color: "#E4405F", transform: "scale(1.2)" },
                                }}
                            >
                                <InstagramIcon />
                            </IconButton>

                            <IconButton
                                href="https://x.com/pionbilisim"
                                target="_blank"
                                sx={{
                                    color: "white",
                                    transition: "transform 0.3s ease, color 0.3s ease",
                                    "&:hover": { color: "black", transform: "scale(1.2)" },
                                }}
                            >
                                <XIcon />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* ✅ 2. Sütun – Hızlı Erişim */}
                    <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold" mb={1}>
                            Hızlı Erişim
                        </Typography>
                        <Stack spacing={1}>
                            {["Anasayfa", "Hakkımızda", "Hizmetlerimiz", "Haberler", "İletişim"].map((item, i) => (
                                <Link
                                    key={i}
                                    href={`#${item.toLowerCase()}`}
                                    underline="hover"
                                    color="white"
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "0.95rem",
                                        transition: "color 0.3s ease",
                                        "&:hover": { color: "#FFC107" },
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Box>

                    {/* ✅ 3. Sütun – İletişim Bilgileri */}
                    <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold" mb={1}>
                            İletişim
                        </Typography>
                        <Stack spacing={1}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center", md: "flex-start" } }}>
                                <LocationOnIcon sx={{ fontSize: 18 }} /> Gazi Osman Paşa Mah. Çerkezköy / Tekirdağ
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center", md: "flex-start" } }}>
                                <PhoneIcon sx={{ fontSize: 18 }} /> +90 532 123 45 67
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center", md: "flex-start" } }}>
                                <EmailIcon sx={{ fontSize: 18 }} /> info@pionbilisim.com
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                {/* 🔻 ALT BÖLÜM – Copyright */}
                <Box sx={{ color:"white",backgroundColor: "#072F73", textAlign: "center", p: 2 }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} <strong>Pion Bilişim</strong> – Tüm Hakları Saklıdır.
                    </Typography>
                </Box>
            </Box>
        </Reveal>
    );
};

export default Footer;
