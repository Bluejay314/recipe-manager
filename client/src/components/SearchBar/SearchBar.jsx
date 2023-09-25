import "./SearchBar.css";

export function SearchBar() {
    return (
        <div className="searchBar">
            <input className="searchBar__input" type="text" placeholder="Search..." />
        </div>
    )
}