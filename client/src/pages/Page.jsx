import { Header, NavBar } from "@/components";
import { Container } from "@mui/material";

export function Page({ children }) {
    return (
        <Container maxWidth="xl">
            <Header />
            <NavBar />
            <Container maxWidth="xl">
                {children}
            </Container>
        </Container>
    )
}