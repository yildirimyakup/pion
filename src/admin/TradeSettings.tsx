import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    CardActions,
    Snackbar,
    Alert
} from "@mui/material";
import { getTradeFee, updateTradeFee } from "../firebase/settingsService";

const TradeSettings = () => {
    const [fee, setFee] = useState<number>(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        getTradeFee().then((f) => setFee(f));
    }, []);

    const handleSave = async () => {
        await updateTradeFee(fee);
        setOpenSnackbar(true); // ✅ Snackbar açılır
    };

    return (
        <Box sx={{ maxWidth: 450, mx: "auto" }}>
            <Card sx={{ p: 2, borderRadius: 4, boxShadow: 4 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        ⚙️ Takas Ücreti Ayarı
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Buradan mağazanın uygulayacağı sabit takas ücretini belirleyebilirsiniz. Bu ücret
                        tüm takas işlemlerinde hesaplamaya eklenir.
                    </Typography>

                    <TextField
                        label="Takas Ücreti (₺)"
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(Number(e.target.value))}
                        fullWidth
                        sx={{
                            my: 2,
                            backgroundColor: "#fafafa",
                            borderRadius: 2,
                            "& fieldset": { border: "1px solid #ddd" }
                        }}
                    />
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            px: 4,
                            py: 1,
                            borderRadius: "30px",
                            textTransform: "none",
                            fontWeight: "bold",
                            background: "linear-gradient(90deg, #43a047, #1976d2)",
                            "&:hover": {
                                background: "linear-gradient(90deg, #388e3c, #1565c0)"
                            }
                        }}
                    >
                        Kaydet
                    </Button>
                </CardActions>
            </Card>

            {/* ✅ Snackbar Bildirimi */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                    Takas ücreti başarıyla güncellendi! ✅
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TradeSettings;
