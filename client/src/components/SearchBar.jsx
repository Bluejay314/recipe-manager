import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Box, MenuItem } from "@mui/material";

const Search = styled("form")(({ theme }) => ({
    position: "relative",
    minWidth: "10ch",
    maxWidth: "40ch",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "30ch",
    },
}));

export function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?q=${query}`);
    };

    return (
        <Search onSubmit={handleSubmit}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <Box sx={{display: { sm: "none", md: "flex" }}}>
                <StyledInputBase
                    placeholder="Search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Box>            
        </Search>
    );
}
