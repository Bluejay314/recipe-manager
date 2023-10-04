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
import axios from "axios";

const drawerWidth = 300;
const menu1 = ["Edit", "Delete", "export", "image"];
const menu2 = ["Branch Recipe"];

export default function RecipeMenu({ isMobile=false }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { recipe, updateRecipe, getUpdateFormData } = useRecipeBuildContext();
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleFavourite = () => {
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
                        <ListItemIcon>
                            {recipe.favourite === true? <StarIcon color="error" /> : <StarBorderIcon />}
                        </ListItemIcon>
                        <ListItemText primary="Favourite" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {menu2.map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {isMobile? (
                <Fragment>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders"
                    >
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            sx={{
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: drawerWidth,
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                </Fragment>
            ) : (
                <Fragment>
                    <Paper
                        sx={{    
                            display: { sm: "none", md: "block" },
                            width: drawerWidth,
                            height: "100vh",
                            }}
                        open
                    >
                        {drawer}
                    </Paper>
                </Fragment>
            )}
        </Box>
    );
}
