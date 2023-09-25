import { Header, NavBar } from "@/components";
import "./Page.css";

export function Page({ children }) {
    return (
        <div className="page">
            <header>
                <Header />
                <NavBar />
            </header>
            <main className="page__content">
                {children}
            </main>
        </div>
    )
}