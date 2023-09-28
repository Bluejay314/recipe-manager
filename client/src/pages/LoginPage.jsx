import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export function LoginPage() {
    return (
        <Box sx={{
            height: "100%",
            backgroundColor: "rgb(70,95, 125)"
        }}>
            <Container maxWidth="md" sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "white",
                height: "100%",
                boxShadow: "0 0 47px 8px rgb(43,43,43,1)"
            }}>
                <Box sx={{
                    display: "grid",
                    placeItems: "center",
                    width: "80%",
                }}>
                    <img src="../src/assets/landing_page_logo.png"/>    
                </Box>
                <Outlet />
            </Container>
        </Box>
    )
}