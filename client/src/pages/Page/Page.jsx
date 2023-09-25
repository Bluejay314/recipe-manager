import { Header, NavBar } from "@/components";
import "./Page.css";

export function Page({ children }) {
    return (
        <div className="page">
            <div>
                <Header />
                <NavBar />
            </div>
            <div className="page__content">
                {children}
            </div>
        </div>
    )
}