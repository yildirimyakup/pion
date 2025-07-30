import { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Switch,
    FormControlLabel,
    Stack,
    Divider,
    Chip,
    Snackbar,
    Alert
} from "@mui/material";
import { Delete, Edit, CloudUpload } from "@mui/icons-material";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../firebase/productServices";
import { uploadToCloudinary } from "../helper/cloudinaryUpload";

const ProductManager = () => {
    // 🔹 Form state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [podyum, setPodyum] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    // 🔹 Liste state
    const [products, setProducts] = useState<any[]>([]);
    const [editId, setEditId] = useState<string | null>(null);

    // 🔍 Arama state
    const [search, setSearch] = useState("");

    // 🔔 Snackbar state
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

    // 🔄 Ürünleri Firestore'dan çek
    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 📤 Ürün ekle veya düzenle
    const handleSave = async () => {
        if (!name || !price || !stock) {
            setSnackbar({ open: true, message: "Tüm alanları doldurmalısın!", severity: "error" });
            return;
        }

        try {
            let imageUrl = "";

            // 📤 Eğer görsel seçildiyse Cloudinary'e yükle
            if (image) {
                imageUrl = await uploadToCloudinary(image);
            }

            if (editId) {
                // 📝 Düzenleme
                await updateProduct(editId, {
                    name,
                    price: Number(price),
                    stock: Number(stock),
                    podyum,
                    ...(imageUrl && { image: imageUrl })
                });
                setSnackbar({ open: true, message: "Ürün başarıyla güncellendi ✅", severity: "success" });
                setEditId(null);
            } else {
                // ➕ Yeni ekleme
                await addProduct({
                    name,
                    price: Number(price),
                    stock: Number(stock),
                    podyum,
                    image: imageUrl
                });
                setSnackbar({ open: true, message: "Ürün başarıyla eklendi ✅", severity: "success" });
            }

            // Form reset
            setName("");
            setPrice("");
            setStock("");
            setPodyum(false);
            setImage(null);
            fetchProducts();
        } catch (error) {
            setSnackbar({ open: true, message: "Bir hata oluştu ❌", severity: "error" });
        }
    };

    // 🗑 Ürün sil
    const handleDelete = async (id: string) => {
        if (window.confirm("Bu ürünü silmek istiyor musun?")) {
            await deleteProduct(id);
            setSnackbar({ open: true, message: "Ürün silindi 🗑", severity: "success" });
            fetchProducts();
        }
    };

    // ✏️ Düzenleme moduna geç
    const handleEdit = (p: any) => {
        setName(p.name);
        setPrice(p.price);
        setStock(p.stock);
        setPodyum(p.podyum);
        setEditId(p.id);
    };

    // 🔍 Arama filtresi
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box maxWidth="md" sx={{ mx: "auto", mt: 4 }}>
            {/* 🔹 ÜRÜN EKLEME FORMU */}
            <Card sx={{ mb: 4, p: 3, borderRadius: 4, boxShadow: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        📦 {editId ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
                    </Typography>

                    <Stack spacing={2} >
                        <TextField
                            label="Ürün Adı"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Fiyat (₺)"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Stok"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={podyum}
                                    onChange={(e) => setPodyum(e.target.checked)}
                                />
                            }
                            label="Podyumda Göster"
                        />

                        {/* 📁 Modern Fotoğraf Yükleme */}
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUpload />}
                            sx={{
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: "bold"
                            }}
                        >
                            📁 Fotoğraf Yükle
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />
                        </Button>

                        {/* 📸 Fotoğraf Önizleme */}
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Önizleme"
                                style={{
                                    marginTop: 10,
                                    width: 150,
                                    height: 150,
                                    objectFit: "cover",
                                    borderRadius: 12,
                                    border: "1px solid #ddd"
                                }}
                            />
                        )}

                        {/* ➕ Ekle/Güncelle Butonu */}
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSave}
                            sx={{
                                mt: 1,
                                borderRadius: "30px",
                                textTransform: "none",
                                fontWeight: "bold",
                                background: "linear-gradient(90deg, #43a047, #1976d2)",
                                "&:hover": {
                                    background: "linear-gradient(90deg, #388e3c, #1565c0)"
                                }
                            }}
                        >
                            {editId ? "Güncelle" : "Ekle"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {/* 🔍 ARAMA ÇUBUĞU */}
            <TextField
                label="Ürün Ara..."
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3 }}
            />

            {/* 🔹 ÜRÜN LİSTESİ */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
                📋 Ürün Listesi
            </Typography>

            {filteredProducts.map((p) => (
                <Card
                    key={p.id}
                    sx={{
                        my: 2,
                        p: 2,
                        borderRadius: 4,
                        boxShadow: 3,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 6
                        }
                    }}
                >
                    <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/* 📸 Ürün Fotoğrafı */}
                            {p.image && (
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    style={{
                                        width: 90,
                                        height: 90,
                                        objectFit: "cover",
                                        borderRadius: 12
                                    }}
                                />
                            )}

                            {/* 📄 Ürün Bilgileri */}
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {p.name}
                                </Typography>
                                <Typography color="text.secondary">{p.price} ₺</Typography>
                                <Typography>Stok: {p.stock}</Typography>
                                <Chip
                                    label={p.podyum ? "✅ Podyumda" : "❌ Podyumda değil"}
                                    sx={{
                                        mt: 1,
                                        bgcolor: p.podyum ? "#4caf50" : "#cfd8dc",
                                        color: p.podyum ? "white" : "black",
                                        fontWeight: "bold"
                                    }}
                                />
                            </Box>
                        </Stack>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <IconButton
                            color="info"
                            onClick={() => handleEdit(p)}
                            sx={{
                                "&:hover": { color: "#0288d1" }
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => handleDelete(p.id)}
                            sx={{
                                "&:hover": { color: "#d32f2f" }
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}

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
        </Box>
    );
};

export default ProductManager;
