import { AppBar, Toolbar } from "@mui/material";
import { SearchBar } from ".";

export function Searcher() {
    return (
        <AppBar position="relative">
            <Toolbar >
                <SearchBar/>
            </Toolbar>
        </AppBar>
    )
}