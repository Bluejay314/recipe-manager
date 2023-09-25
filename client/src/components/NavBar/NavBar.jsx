import "./NavBar.css"
import { SearchBar } from "@/components"

export function NavBar() {
    return (
        <ul className="navBar">
            <li>Home</li>
            <li>New Recipe</li>
            <li>Options</li>
            <SearchBar />
        </ul>
    )
}