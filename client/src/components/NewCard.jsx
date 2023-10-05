import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box, CardActionArea, Divider } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

export default function NewCard({ recipe }) {
    const navigate = useNavigate();

    const handleOpen = (event) => {
        event.preventDefault();
        navigate(`/user/recipes?q=${recipe._id}`)
    }
//mkR9KfsT1WkbVnZF
    return (
        <Box>
            <CardActionArea onClick={handleOpen} sx={{position: "relative"}}>
                <CardMedia
                    component="img"
                    alt={recipe.title}
                    width="100%"
                    image={`http://localhost:3010${recipe.image}`}
                    sx={{aspectRatio: 1.5}}
                />
                {recipe.favourite && (<Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.4)"
                }}>
                    <StarIcon sx={{
                        color: "yellow",
                        stroke: "black"
                        }} />
                </Box>)}
            </CardActionArea>
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography gutterBottom variant="body1" fontFamily='Gabarito' component="div">
                    {recipe.title}
                </Typography>
            </CardContent>
        </Box>
    );
}
