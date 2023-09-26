import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, IconButton } from "@mui/material";
import styled from "@emotion/styled";

export function RecipeCard({ title, image, description }) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded)

    return (
        <Card>
            <CardMedia
                component="img"
                alt={title}
                height="140"
                image={image}
            />
            <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {title}
                </Typography>
                <IconButton
                    onClick={handleExpandClick}
                    sx={{
                        transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
                        marginLeft: "auto",
                        transition: "ease",
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardContent>
        </Card>
    );
}
