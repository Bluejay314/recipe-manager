import Header from "@/components/Header";
import "@/styleSheets/Page.css";

export default function Page({ children }) {
    return (
        <div className="page">
            <div>
                <Header />
            </div>
            {children}
        </div>
    )
}