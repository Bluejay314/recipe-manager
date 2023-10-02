import { Header } from "@/components";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export function Page({ children }) {
    return (
        <Box>
            <Header />
            <Container maxWidth="xl">
                <Outlet />
            </Container>
        </Box>
    )
}