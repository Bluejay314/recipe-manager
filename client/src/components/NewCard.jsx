import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box, CardActionArea, Divider } from "@mui/material";

export default function NewCard({ recipe }) {
    const navigate = useNavigate();

    const handleOpen = (event) => {
        event.preventDefault();
        navigate(`/user/recipes?q=${recipe._id}`)
    }
    return (
        <Box sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleOpen}>
            <CardMedia
               component="img"
               alt={recipe.title}
               width="100%"
               image={`http://localhost:3010${recipe.image}`}
               sx={{aspectRatio: 1.5, }}
            />
            </CardActionArea>
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography gutterBottom variant="subtitle1" fontWeight="bold" component="div">
                    {recipe.title}
                </Typography>
            </CardContent>
        </Box>
    );
}
