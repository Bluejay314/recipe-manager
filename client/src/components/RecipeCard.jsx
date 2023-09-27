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

export function RecipeCard({ title, image, description }) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    const handleOpen = () => {
        console.log("boop")
    }

    return (
        <Card>
            <Box position="relative">
                <CardActionArea onClick={handleOpen}>
                    <CardMedia
                        component="img"
                        alt={title}
                        width="100%"
                        image={image}
                        sx={{aspectRatio: 1.5}}
                    />
                    <Box
                        position="absolute"
                        sx={{
                            inset: "auto 0 0 0",
                            backgroundColor: "rgb(255,255,255, 0.6)",
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight={600}>
                            Food
                        </Typography>
                    </Box>
                </CardActionArea>
            </Box>

            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography
                    variant="subtitle1"
                    component="div"
                    gutterBottom
                    height="3em"
                    overflow="hidden"
                >
                    {title}
                </Typography>
                <IconButton
                    onClick={handleExpandClick}
                    sx={{
                        width: "fit-content",
                        height: "auto",
                        transform: !expanded? "rotate(0deg)" : "rotate(180deg)",
                        transition: "ease",
                    }}
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </Collapse>
        </Card>
    );
}
