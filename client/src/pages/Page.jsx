import { Header, NavBar } from "@/components";
import { Container } from "@mui/material";

export function Page({ children }) {
    return (
        <Container maxWidth>
            <Header />
            <NavBar />
            <Container maxWidth="xl">
                {children}
            </Container>
        </Container>
    )
}