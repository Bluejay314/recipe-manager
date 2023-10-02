import {
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";
import { Logo } from "@/components";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import RecipeStepper from "./recipeBuilder/RecipeStepper";

const settings = ["Profile", "Logout"];

const pages = [
    {label: "Home", link: "/"},
    {label: "Recipes", link: "/user/search"}];

export function Header() {
    const { currentUser, handleUpdateUser } = useUserContext();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    console.log(currentUser);
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        handleCloseUserMenu();
        handleUpdateUser({});
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const settingsItems = settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">
                {setting}
            </Typography>
        </MenuItem>
    ));

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            minHeight="10vh"
            px={12}
            color="white"
            sx={{backgroundColor: "rgb(30,100,200)"}}
        >
            <Box display="flex" alignItems="center">
                <img src="/src/assets/logo.png" height="100vh"/>
                <Logo content="CULINARY COMPOSER" variant="h5" />
            </Box>

            <Box sx={{display: { xs: "none", md: "flex" }}}>
                {pages.map((page) => (
                    <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
                ))}
                <MenuItem component={"div"} onClick={() => setModalOpen(true)}>New</MenuItem>
            </Box>
            
            <Box 
                display="flex" 
                alignItems="center"
                gap="1em"
            >
                <Typography variant="subtitle1">{currentUser.userName? currentUser.userName : "userName"}</Typography>
                <Tooltip title="Options">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar />
                    </IconButton>
                </Tooltip>

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

                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem key="logout" onClick={handleLogOut}>
                        <Typography textAlign="center">
                            logout
                        </Typography>
                    </MenuItem>
                </Menu>
            </Box>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    }}>
                        <RecipeStepper />
                </Box>
            </Modal>
        </Box>
    );
}
