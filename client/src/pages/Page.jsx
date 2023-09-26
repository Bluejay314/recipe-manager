import { Header, NavBar } from "@/components";
import { Container } from "@mui/material";

export function Page({ children }) {
    return (
        <Container maxWidth="100%" sx={{padding: "0px"}}>
            <Header />
            <NavBar />
            {children}
        </Container>
    )
}