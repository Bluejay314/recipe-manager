import "@/styleSheets/Header.css";

export default function Header() {
    return (
        <div className="header">
            <h1 className="header__title">Recipe Manager</h1>
            <div className="header__profileSection">
                <span>My Profile</span>
                <button>P</button>
            </div>
        </div>
    )
}