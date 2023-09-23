import "@/styleSheets/NavBar.css"
import SearchBar from "./SearchBar"

export default function NavBar() {
    return (
        <ul className="navBar">
            <li>Home</li>
            <li>New Recipe</li>
            <li>Options</li>
            <SearchBar />
        </ul>
    )
}