import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { SearchBar } from ".";
import { NavLink } from "react-router-dom";

function NavBar() {
    

   

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                {/* On a smaller screen the menu will be on the left. On larger screens options are centered. */}
                <Toolbar sx={{display: { xs: "block", md: "flex" }, justifyContent:"center"}} disableGutters>

                    {/* This content defines the menu for smaller screens */}
                    <Box sx={{display: { xs: "flex", md: "none" }}}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (<MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>))}
                        </Menu>
                    </Box>
                    
                    {/* This content defines the menu for larger screens */}
                    <Box sx={{display: { xs: "none", md: "flex" }}}>
                        {pages.map((page) => (
                            <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
