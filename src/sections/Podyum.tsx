import { useEffect, useState } from "react";
import { getPodyumProducts } from "../firebase/productServices";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Stack
} from "@mui/material";
import TradeDialog from "../components/TradeDialog";
import Reveal from "../components/Reveal.tsx";

const PodyumSection = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        getPodyumProducts().then(setProducts);
    }, []);

    return (
        <Box
            id="urun"
            sx={{
                py: 10,
                textAlign: "center",
                background: "linear-gradient(to bottom, #ffffff, #f9f9f9)"
            }}
        >
            {/* 🔹 Başlık */}
            <Reveal>
                <Typography variant="h3" fontWeight="bold" mb={2}>
                    Takas Ürünleri
                </Typography>
            </Reveal>

            <Reveal delay={0.2}>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    mb={6}
                    maxWidth="700px"
                    mx="auto"
                >
                    Özenle seçilmiş podyum ürünlerimizi keşfedin ve kolayca takas hesaplaması yapın.
                </Typography>
            </Reveal>

            {/* 🔹 Ürün Kartları */}
            <Grid container spacing={4} justifyContent="center">
                {products.map((p, index) => (
                    <Grid item xs={12} sm={6} md={3} key={p.id}>
                        <Reveal delay={index * 0.2}>
                            <Card
                                sx={{
                                    boxShadow: 4,
                                    height: "100%",
                                    width:"200px",
                                    borderRadius: 4,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px) scale(1.03)",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
                                    }
                                }}
                            >
                                {/* 📸 Ürün Görseli */}
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={p.image}
                                    alt={p.name}
                                    sx={{
                                        objectFit: "cover",
                                        borderTopLeftRadius: 16,
                                        borderTopRightRadius: 16
                                    }}
                                />

                                {/* 📄 Ürün İçeriği */}
                                <CardContent>
                                    <Stack spacing={1} alignItems="center">
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold", color: "#2e7d32" }}
                                        >
                                            {p.name}
                                        </Typography>

                                        {/* ✅ Podyum Chip */}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Reveal>
                    </Grid>
                ))}
            </Grid>

            {/* 🔹 Takas Dialog Butonu */}
            <Reveal delay={0.3}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Button
                        variant="contained"
                        sx={{
                            px: 5,
                            py: 1.5,
                            fontSize: "1.1rem",
                            borderRadius: "30px",
                            textTransform: "none",
                            fontWeight: "bold",
                            background: "linear-gradient(90deg, #43a047, #1976d2)",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                            "&:hover": {
                                background: "linear-gradient(90deg, #388e3c, #1565c0)",
                                boxShadow: "0px 6px 14px rgba(0,0,0,0.3)"
                            }
                        }}
                        onClick={() => setOpenDialog(true)}
                    >
                        🔄 Takas Hesapla
                    </Button>
                </Box>
            </Reveal>

            {/* 🔹 Takas Dialog */}
            <TradeDialog open={openDialog} onClose={() => setOpenDialog(false)} />
        </Box>
    );
};

export default PodyumSection;
