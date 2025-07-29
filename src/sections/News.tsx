import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress
} from "@mui/material";
import Reveal from "../components/Reveal.tsx";
import { getPublishedNews } from "../firebase/newsServices"; // ✅ Firestore'dan veri çekecek

const News = () => {
    const [newsList, setNewsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState<any>(null);

    // Firestore'dan haberleri çek
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const news = await getPublishedNews();
            setNewsList(news.sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds)); // Yeni haber en üstte
            setLoading(false);
        };
        fetchNews();
    }, []);

    return (
        <Box
            id="haberler"
            sx={{
                py: 10,
                background: "linear-gradient(to bottom, #ffffff, #f5f5f5)"
            }}
        >
            {/* 🔹 Başlık */}
            <Reveal>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    textAlign="center"
                    mb={2}
                >
                    Haberler & Duyurular
                </Typography>
            </Reveal>

            <Reveal delay={0.2}>
                <Typography
                    variant="h6"
                    textAlign="center"
                    color="text.secondary"
                    mb={6}
                >
                    Pion Bilişim’den en son haberleri ve duyuruları buradan takip edebilirsiniz.
                </Typography>
            </Reveal>

            {/* 🔹 Haberler Listesi */}
            {loading ? (
                <Stack alignItems="center" mt={5}>
                    <CircularProgress />
                </Stack>
            ) : newsList.length === 0 ? (
                <Typography textAlign="center" color="text.secondary">
                    Şu anda yayında haber bulunmamaktadır.
                </Typography>
            ) : (
                <Stack spacing={3} maxWidth={650} mx="auto">
                    {newsList.map((news, index) => (
                        <Reveal key={news.id} delay={index * 0.2}>
                            <Card
                                onClick={() => setSelectedNews(news)}
                                sx={{
                                    p: 2,
                                    boxShadow: 3,
                                    borderRadius: 3,
                                    borderLeft: "5px solid #FFD700",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-5px) scale(1.02)",
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
                                    }
                                }}
                            >
                                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    {/* 📆 Tarih Badge */}
                                    <Chip
                                        label={news.createdAt?.toDate
                                            ? new Date(news.createdAt.toDate()).toLocaleDateString("tr-TR")
                                            : "Tarih Yok"}
                                        color="primary"
                                        variant="outlined"
                                        sx={{
                                            fontWeight: "bold",
                                            width: "fit-content",
                                            mb: 1
                                        }}
                                    />

                                    {/* 📜 Haber Başlığı */}
                                    <Typography variant="h6" fontWeight="bold">
                                        {news.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Daha fazla oku...
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Reveal>
                    ))}
                </Stack>
            )}

            {/* 🔹 Haber Detay Dialog */}
            <Dialog open={Boolean(selectedNews)} onClose={() => setSelectedNews(null)} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedNews?.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle2" color="text.secondary" mb={2}>
                        {selectedNews?.createdAt?.toDate
                            ? new Date(selectedNews.createdAt.toDate()).toLocaleDateString("tr-TR")
                            : ""}
                    </Typography>
                    <Typography variant="body1">{selectedNews?.content}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedNews(null)} color="primary">
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default News;
