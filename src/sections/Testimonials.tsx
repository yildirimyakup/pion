import { Box, Typography, Paper, Avatar } from "@mui/material";
import Reveal from "../components/Reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// ✅ Swiper CSS eklenmezse Pagination noktaları veya stil gelmez, hata olabilir


const testimonials = [
    { name: "Mehmet Öztürk", comment: "Pion Bilişim sayesinde işletmemiz dijital dünyaya adım attı. Çok memnun kaldık!", rating: "⭐⭐⭐⭐⭐" },
    { name: "Selin Arslan", comment: "Profesyonel ekip, hızlı teslimat. Şiddetle tavsiye ederim.", rating: "⭐⭐⭐⭐⭐" },
    { name: "Okan Kılıç", comment: "Web sitemiz ve sosyal medya yönetimi harika bir şekilde yapıldı.", rating: "⭐⭐⭐⭐" },
    { name: "Fatma Güneş", comment: "Sorunlarımızı çok hızlı çözdüler, teşekkür ederiz!", rating: "⭐⭐⭐⭐⭐" },
    { name: "Emre Yıldız", comment: "Her aşamada bilgilendirme yaptılar, güvenilir firma.", rating: "⭐⭐⭐⭐⭐" },
];

const Testimonials = () => {
    return (
        <Box id="yorum" sx={{ py: 10, background: "linear-gradient(to bottom, #ffffff, #f9f9f9)" }}>
            <Reveal>
                <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
                    Müşteri Yorumları
                </Typography>
            </Reveal>

            <Reveal delay={0.2}>
                <Typography
                    variant="h6"
                    textAlign="center"
                    color="text.secondary"
                    mb={6}
                >
                    Pion Bilişim olarak müşteri memnuniyetini ön planda tutuyoruz. İşte bizimle çalışmış birkaç müşterimizin görüşleri:
                </Typography>
            </Reveal>

            {/* ✅ Swiper tam genişlikte */}
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    padding: "10px",
                    margin: "auto",
                }}
            >
                {testimonials.map((test, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "stretch",
                                height: "100%",
                            }}
                        >
                            <Paper
                                sx={{
                                    width: "100%",
                                    maxWidth: 350,
                                    p: 4,
                                    boxShadow: 5,
                                    borderRadius: 4,
                                    textAlign: "center",
                                    background: "white",
                                    transition: "transform 0.3s ease",
                                    "&:hover": { transform: "scale(1.03)" }
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "primary.main",
                                        width: 60,
                                        height: 60,
                                        margin: "auto",
                                        fontSize: 22,
                                    }}
                                >
                                    {test.name.charAt(0)}
                                </Avatar>

                                <Typography variant="h6" mt={2} mb={1} fontWeight="bold">
                                    {test.name}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    mb={2}
                                    color="text.secondary"
                                    sx={{ fontStyle: "italic" }}
                                >
                                    "{test.comment}"
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="secondary"
                                    sx={{ fontSize: "1.3rem" }}
                                >
                                    {test.rating}
                                </Typography>
                            </Paper>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default Testimonials;
