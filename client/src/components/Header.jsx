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
import { Logo, SearchBar } from "@/components";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import RecipeStepper from "./recipeBuilder/RecipeStepper";
import RecipeMenu from "./RecipeMenu";

const settings = ["Profile", "Logout"];

export function Header({ children }) {
    const { currentUser, handleUpdateUser } = useUserContext();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
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
            justifyContent={"center"}
            alignItems="center"
            minHeight="10vh"
            color="white"
            sx={{
                px: {md: "2em", xl: "4em"},
                backgroundColor: "rgb(245, 144, 66)"
            }}
        >
            {children}
            <img src="/src/assets/logo.png" height="100vh"/>
            <Logo content="CULINARY COMPANION" variant="h5"/>
            <SearchBar/>

            <Box flexGrow={1}></Box>
            
            <Box 
                display="flex" 
                alignItems="center"
                gap="1em"
            >
                <Typography variant="subtitle1">{currentUser.userName? currentUser.userName : "userName"}</Typography>
                <Tooltip title="Options">
                    <IconButton onClick={handleOpenUserMenu}>
                        <Avatar />
                    </IconButton>
                </Tooltip>
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
                        width: {xs: "100%", md: "600px"},
                        height: {xs: "70%"},
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
