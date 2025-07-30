import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Stack,
    Alert,
    Divider,
    Snackbar,
    TextField
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { getProducts } from "../firebase/productServices";
import { getTradeFee } from "../firebase/settingsService";

interface Props {
    open: boolean;
    onClose: () => void;
}

const TradeDialog = ({ open, onClose }: Props) => {
    const [products, setProducts] = useState<any[]>([]);
    const [tradeFee, setTradeFee] = useState<number>(0);

    // Autocomplete seçilen ürün state
    const [selectedUserProduct, setSelectedUserProduct] = useState<any | null>(null);
    const [selectedStoreProduct, setSelectedStoreProduct] = useState<any | null>(null);

    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [resultColor, setResultColor] = useState<string>("#2e7d32");

    // ✅ Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "info"
    });

    useEffect(() => {
        if (open) {
            getProducts().then(setProducts);
            getTradeFee().then(setTradeFee);
        } else {
            // Dialog kapanınca resetle
            setSelectedUserProduct(null);
            setSelectedStoreProduct(null);
            setResult(null);
            setError(null);
        }
    }, [open]);

    const hesapla = () => {
        setResult(null);
        setError(null);

        if (!selectedUserProduct || !selectedStoreProduct) {
            setError("Lütfen elinizdeki ürünü ve almak istediğiniz ürünü seçiniz.");
            return;
        }

        if (selectedStoreProduct.stock === 0) {
            setError(`❌ ${selectedStoreProduct.name} stokta yok!`);
            return;
        }

        const fark = selectedStoreProduct.price - selectedUserProduct.price;
        const toplam = fark + tradeFee;

        if (fark > 0) {
            setResult(`Üzerine ${toplam}₺ ödemeniz gerekiyor.`);
            setResultColor("#1976d2");
            setSnackbar({ open: true, message: "Takas sonucu: Ödeme gerekiyor", severity: "info" });
        } else if (fark < 0) {
            setResult(`Üzerine ${tradeFee}₺ ödemeniz gerekiyor.`);
            setResultColor("#ef6c00");
            setSnackbar({ open: true, message: "Takas sonucu: Ödeme gerekiyor", severity: "info" });
        } else {
            setResult(`Sadece ${tradeFee}₺ takas ücreti ödenir.`);
            setResultColor("#2e7d32");
            setSnackbar({ open: true, message: "Takas sonucu: Ödeme gerekiyor", severity: "info" });
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{ sx: { borderRadius: 4, boxShadow: 6 } }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        textAlign: "center"
                    }}
                >
                    🔄 Takas Hesaplama
                </DialogTitle>

                <DialogContent sx={{ mt: 1 }}>
                    <Typography textAlign="center" color="text.secondary" mb={3}>
                        Elinizdeki ürünü ve almak istediğiniz ürünü seçerek takas hesabı yapın.
                    </Typography>


                    <Stack spacing={3}>
                        {/* Kullanıcı Ürünü - Autocomplete */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                📦 Elinizdeki Ürün:
                            </Typography>
                            <Autocomplete
                                options={products}
                                getOptionLabel={(option) => option.name}
                                value={selectedUserProduct}
                                onChange={(event, newValue) => setSelectedUserProduct(newValue)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Ürün Ara..." variant="outlined" />
                                )}
                            />
                        </Box>

                        {/* Mağaza Ürünü - Autocomplete */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                🏬 Mağazadan Seçeceğiniz Ürün:
                            </Typography>
                            <Autocomplete
                                options={products}
                                getOptionLabel={(option) =>
                                    `${option.name} ${option.stock === 0 ? "(Stokta Yok)" : ""}`
                                }
                                value={selectedStoreProduct}
                                onChange={(event, newValue) => setSelectedStoreProduct(newValue)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Ürün Ara..." variant="outlined" />
                                )}
                            />
                        </Box>

                        {/* Hata Mesajı */}
                        {error && <Alert severity="error">{error}</Alert>}

                        {/* Hesaplama Sonucu */}
                        {result && (
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    bgcolor: "#f9f9f9",
                                    borderRadius: 2,
                                    border: `2px solid ${resultColor}`
                                }}
                            >
                                <Typography variant="h6" sx={{ color: resultColor, fontWeight: "bold" }}>
                                    {result}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>

                <Divider sx={{ my: 1 }} />

                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button variant="outlined" onClick={onClose} sx={{ borderRadius: "30px", px: 3 }}>
                        Kapat
                    </Button>
                    <Button
                        variant="contained"
                        onClick={hesapla}
                        sx={{
                            borderRadius: "30px",
                            px: 4,
                            py: 1,
                            fontWeight: "bold",
                            background: "linear-gradient(90deg, #43a047, #1976d2)",
                            "&:hover": { background: "linear-gradient(90deg, #388e3c, #1565c0)" }
                        }}
                    >
                        Hesapla
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ✅ Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2500}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                message={snackbar.message}
            />
        </>
    );
};

export default TradeDialog;
