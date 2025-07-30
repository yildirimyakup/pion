import { useEffect, useState } from "react";
import {
    Container,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Stack,
    Chip,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";
import { Delete, Edit, Publish, Unpublished } from "@mui/icons-material";
import { addNews, getAllNews, deleteNews, updateNews } from "../firebase/newsServices";

const NewsManager = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [newsList, setNewsList] = useState<any[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [search, setSearch] = useState(""); // 🔍 Arama için state

    // 🔔 Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "info" | "warning"
    });

    // 🔄 Haberleri Firestore'dan çek
    const fetchNews = async () => {
        const news = await getAllNews();
        setNewsList(news.sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds));
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // ✅ Haber ekle veya düzenle
    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            setSnackbar({ open: true, message: "Başlık ve içerik boş olamaz!", severity: "error" });
            return;
        }

        if (editId) {
            await updateNews(editId, { title, content });
            setSnackbar({ open: true, message: "Haber başarıyla güncellendi ✅", severity: "success" });
            setEditId(null);
        } else {
            await addNews(title, content);
            setSnackbar({ open: true, message: "Haber başarıyla eklendi ✅", severity: "success" });
        }

        setTitle("");
        setContent("");
        fetchNews();
    };

    // 🗑 Haber sil
    const handleDelete = async (id: string) => {
        if (window.confirm("Bu haberi silmek istediğine emin misin?")) {
            await deleteNews(id);
            setSnackbar({ open: true, message: "Haber silindi 🗑", severity: "info" });
            fetchNews();
        }
    };

    // 📢 Haberi yayına al/kaldır
    const togglePublish = async (id: string, isPublished: boolean) => {
        await updateNews(id, { isPublished: !isPublished });
        setSnackbar({
            open: true,
            message: isPublished ? "Haber yayından kaldırıldı ❌" : "Haber yayına alındı ✅",
            severity: isPublished ? "warning" : "success"
        });
        fetchNews();
    };

    // ✏️ Düzenleme moduna al
    const handleEdit = (news: any) => {
        setTitle(news.title);
        setContent(news.content);
        setEditId(news.id);
    };

    // 🔍 Arama filtresi
    const filteredNews = newsList.filter((news) =>
        news.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="md">
            {/* 🔹 Haber Ekleme Formu */}
            <Card sx={{ mb: 4, boxShadow: 4, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {editId ? "✏️ Haberi Düzenle" : "📰 Yeni Haber Ekle"}
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="Başlık"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label="İçerik"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{ alignSelf: "flex-end", px: 4, py: 1 }}
                        >
                            {editId ? "Kaydet" : "Ekle"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {/* 🔍 Arama Alanı */}
            <TextField
                label="Haber Ara..."
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* 🔹 Haber Listesi */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                📜 Haber Listesi
            </Typography>

            {filteredNews.length === 0 ? (
                <Typography color="text.secondary">Henüz haber eklenmemiş.</Typography>
            ) : (
                filteredNews.map((news) => (
                    <Card
                        key={news.id}
                        sx={{
                            mb: 2,
                            boxShadow: 2,
                            borderRadius: 3,
                            transition: "0.3s",
                            "&:hover": { boxShadow: 5 }
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography variant="h6" fontWeight="bold">
                                    {news.title}
                                </Typography>
                                <Chip
                                    label={news.isPublished ? "✅ Yayında" : "❌ Yayında Değil"}
                                    color={news.isPublished ? "success" : "default"}
                                />
                            </Stack>
                            <Typography variant="body2" color="text.secondary" mt={1}>
                                {news.content}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            <IconButton
                                color={news.isPublished ? "warning" : "primary"}
                                onClick={() => togglePublish(news.id, news.isPublished)}
                            >
                                {news.isPublished ? <Unpublished /> : <Publish />}
                            </IconButton>
                            <IconButton color="info" onClick={() => handleEdit(news)}>
                                <Edit />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDelete(news.id)}>
                                <Delete />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
            )}

            {/* 🔔 Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NewsManager;
