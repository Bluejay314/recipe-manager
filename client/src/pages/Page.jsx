import { Header, NavBar } from "@/components";
import { Box, Container } from "@mui/material";

export function Page({ children }) {
    return (
        <Box>
            <Header />
            <NavBar />
            <Container maxWidth="xl">
                {children}
            </Container>
        </Box>
    )
}