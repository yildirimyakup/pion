import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0057A0", // Daha kurumsal mavi
        },
        secondary: {
            main: "#FF7A00", // Turuncu aksan
        },
        background: {
            default: "#f9f9f9",
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', sans-serif",
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        body1: { fontSize: "1.1rem", lineHeight: 1.7 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "#003c7a"
                    }
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#0057A0",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" }
                }
            }
        }
    }});

export default theme;
