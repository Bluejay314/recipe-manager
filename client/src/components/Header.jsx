import "@/styleSheets/Header.css";
import { Settings } from "iconoir-react";

export default function Header() {
    return (
        <div className="header">
            <h1 className="header__title">Recipe Manager</h1>
            <div className="header__profileSection">
                My Profile
                <button className="header__profileButton">
                    <Settings color="black" height={36} width={36} />
                </button>
            </div>
        </div>
    )
}