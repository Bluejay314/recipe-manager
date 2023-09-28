import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Box, MenuItem } from "@mui/material";

const Search = styled("form")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
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
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
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
            <Box sx={{display: { xs: "none", sm: "flex" }}}>
                <StyledInputBase
                    placeholder="Search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Box>
                {/* <MenuItem component="div" >meow</MenuItem> */}
            
        </Search>
    );
}
