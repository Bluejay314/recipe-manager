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
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import RecipeStepper from "./RecipeStepper";
import { RecipeBuildProvider } from "../context/RecipeBuildContext";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";

const settings = ["Profile", "Logout"];

export default function Header({ children, height }) {
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
            position="sticky"
            top="0"
            height={height}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            color="white"
            zIndex="5"
            sx={{
                px: {md: "2em", xl: "4em"},
                backgroundColor: "rgb(47, 94, 128)",
                boxShadow: "0 0 0.5em 0.25em rgba(0, 0, 0, 0.25)"
            }}
        >
            {children}
            <img src="/src/assets/logo.png" height="100vh"/>
            <Logo content="COOKS COMPANION" variant="h6"/>
            <SearchBar/>

            <Box display="flex" gap="0.5em" ml="0.75em">
                <MenuItem component={NavLink} to="/" sx={{
                    backgroundColor: "rgba(255, 162, 23, 0.75)",
                    borderRadius: "1em"
                }}>Home</MenuItem>
                <MenuItem onClick={() => setModalOpen(true)} sx={{
                    backgroundColor: "rgba(255, 162, 23, 0.75)",
                    borderRadius: "1em"
                }}>New Recipe</MenuItem>
            </Box>

            <Box flexGrow={1}></Box>
            
            <Box 
                display="flex" 
                alignItems="center"
                gap="1em"
            >
                <Typography variant="subtitle1">{currentUser.userName? currentUser.userName : "userName"}</Typography>
                <Tooltip title="Options">
                    <IconButton onClick={handleOpenUserMenu}>
                        <Avatar sx={{backgroundColor: "rgba(255, 162, 23, 0.75)", color: "white"}}/>
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
                        <RecipeBuildProvider>
                            <RecipeStepper onFinish={() => setModalOpen(false)} />
                        </RecipeBuildProvider>
                    </Box>
                </Modal>    
        </Box>
    );
}