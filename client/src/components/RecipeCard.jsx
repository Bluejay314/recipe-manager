import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, CardActionArea, Collapse, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export function RecipeCard({ recipe }) {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const handleExpandClick = () => setExpanded(!expanded);

    const handleOpen = (event) => {
        event.preventDefault();
        navigate(`/user/recipes?q=${recipe._id}`)
    }

    return (
        <Card>
            <Box position="relative">
                <CardActionArea onClick={handleOpen}>
                    <CardMedia
                        
                    />
                </CardActionArea>
            </Box>

            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography
                    variant="subtitle1"
                    component="div"
                    height="3em"
                    overflow="hidden"
                    gutterBottom
                >
                    {recipe.title}
                </Typography>
            </CardContent>
        </Card>
    );
}
