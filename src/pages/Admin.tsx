import { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Stack,
    Chip,
    Box,
} from "@mui/material";
import { Logout, Delete, Edit, Publish, Unpublished } from "@mui/icons-material";
import { addNews, getAllNews, deleteNews, updateNews } from "../firebase/newsServices";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Admin = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [newsList, setNewsList] = useState<any[]>([]);
    const [editId, setEditId] = useState<string | null>(null);

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
            alert("Başlık ve içerik boş olamaz!");
            return;
        }

        if (editId) {
            await updateNews(editId, { title, content });
            setEditId(null);
        } else {
            await addNews(title, content);
        }

        setTitle("");
        setContent("");
        fetchNews();
    };

    // 🗑 Haber sil
    const handleDelete = async (id: string) => {
        if (window.confirm("Bu haberi silmek istediğine emin misin?")) {
            await deleteNews(id);
            fetchNews();
        }
    };

    // 📢 Haberi yayına al/kaldır
    const togglePublish = async (id: string, isPublished: boolean) => {
        await updateNews(id, { isPublished: !isPublished });
        fetchNews();
    };

    // ✏️ Düzenleme moduna al
    const handleEdit = (news: any) => {
        setTitle(news.title);
        setContent(news.content);
        setEditId(news.id);
    };

    // 🚪 Çıkış yap
    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = "/login";
    };

    return (
        <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
            {/* 🔹 ÜST BAR */}
            <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight="bold">
                        📊 Admin Paneli
                    </Typography>
                    <Button
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        color="inherit"
                        sx={{ fontWeight: "bold" }}
                    >
                        Çıkış Yap
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 4 }}>
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

                {/* 🔹 Haber Listesi */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    📜 Haber Listesi
                </Typography>

                {newsList.length === 0 ? (
                    <Typography color="text.secondary">Henüz haber eklenmemiş.</Typography>
                ) : (
                    newsList.map((news) => (
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
            </Container>
        </Box>
    );
};

export default Admin;
