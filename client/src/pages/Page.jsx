import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import "@/styleSheets/Page.css";

export default function Page({ children }) {
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