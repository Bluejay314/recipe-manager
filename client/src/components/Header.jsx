import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { Logo } from "@/components";
import { useState } from "react";

const settings = ["Profile", "Logout"];

export function Header() {
    /*
      User menu is not shown if this object is null (use useRef?)
    */
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
        >
            {/* Content for the left side of the NavBar */}
            <Box
                display="flex"
                alignItems="center"
            >
                <img src=".\src\assets\logo.png" height="100vh"/>
                <Logo content="CULINARY COMPOSER" variant="h5" />
            </Box>
            
            {/* Content for the right side of the NavBar */}
            <Box 
                display="flex" 
                alignItems="center"
                gap="1em"
            >
                <Typography variant="subtitle1">UserName</Typography>
                {/* Defines user avatar, menu opening, and tooltip */}
                <Tooltip title="Options">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar src="/static/images/avatar/2.jpg"/>
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
                    {settingsItems}
                </Menu>
            </Box>
        </Box>
    );
}
