import "./NavBar.css"
import { SearchBar } from "@/components"
import { Menu } from "iconoir-react"

export function NavBar() {
    return (
        <div className="navBar">
            <ul className="navBar__md">
                <li>Home</li>
                <li>New Recipe</li>
                <li>Options</li>
            </ul>
            <div className="navBar__sm">
                <Menu />
            </div>
            <SearchBar />
        </div>
    )
}