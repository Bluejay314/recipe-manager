import { Fragment, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useRecipeBuildContext } from "@/context/RecipeBuildContext";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import Switch from '@mui/material/Switch';
import axios from "axios";
import { AIAvatar } from ".";

const drawerWidth = 300;

export default function RecipeMenu() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [botEnabled, setBotEnabled] = useState(false);
    const { recipe, updateRecipe, getUpdateFormData } = useRecipeBuildContext();
    
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleFavourite = async () => {
        try {
            const response = await axios.put(`http://localhost:3010/recipes/update/${recipe._id}`, {favourite: !recipe.favourite})
            console.dir(response.body);
        }
        catch(err) {
            console.log(err)
        }

        updateRecipe({favourite: !recipe.favourite})
    }

    const handleCanEdit = () => {
        updateRecipe({canEdit: !recipe.canEdit})
    }

    const handleSave = async () => {
        updateRecipe({canEdit: false});

        
        try {
            const formData = getUpdateFormData();
            console.dir(formData);
            const response = await axios.put(`http://localhost:3010/recipes/update/${recipe._id}`, formData); 
            console.log(response.data);
        } catch(err) {
            console.log(err)
        }
    }

    const handleSaveAs = () => {

    }

    const drawer = (
        <div>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleSave} disabled={!recipe.canEdit? true : false}>
                        <ListItemIcon><ModeEditIcon /></ListItemIcon>
                        <ListItemText primary="Save" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={handleCanEdit}>
                        <ListItemIcon><SaveIcon /></ListItemIcon>
                        <ListItemText primary="Edit" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={handleFavourite}>
                        <ListItemIcon>{recipe.favourite === true? <StarIcon color="error" /> : <StarBorderIcon />}</ListItemIcon>
                        <ListItemText primary="Favourite" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
            
            <List>
                <ListItem >
                    <ListItemIcon><Switch  checked={botEnabled} onChange={() => setBotEnabled(!botEnabled)}/></ListItemIcon>
                    <ListItemText primary="AI Enabled" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box>
            <CssBaseline />
            {botEnabled && <AIAvatar />}
            <Box display="flex" justifyContent="center" py="0.5em" borderBottom="0.15em solid rgba(0, 0, 0, 0.2)">
                <Typography variant="h6">Actions</Typography>
            </Box>
            
            <Box
                sx={{    
                    width: drawerWidth,
                    height: "100vh",
                    display: {xs: "none", md: "flex"}
                    }}
                open
            >
                {drawer}
            </Box>

            {/* The following is for mobile devices or small screens */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            <IconButton
                color="black"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                    display: {xs: "block", md: "none"}, 
                    alignItems: "center",
                    color: "rgb(100, 64, 35)",
                    justifyContent: "center",
                    boxShadow: "0 0 4px rgb(100, 64, 35)",
                    mr: 2, 
                    border: "2px solid rgb(100, 64, 35)",
                    aspectRatio: 1,
                    position: "absolute",
                    top: "5em",
                    right: "1em",
                    zIndex: 99
                }}
            >
                <MenuIcon sx={{pb: "0.em",}} />
            </IconButton>
        </Box>
    );
}
