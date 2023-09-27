import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { RecipeCard, SideBar } from "@/components";
import { Page } from "@/pages";

export function SearchPage({ items }) {
    return (
        <Page>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "20% 80%",
                py: "4em",
                px: {sm:"0.5em", md:"2em", lg: "4em"}
            }}>
            <SideBar />
            <Box pl={4}>
                <Grid container spacing={2}>
                    {items.map((item) => (
                        <Grid sm={12} md={6} lg={4} xl={3}>
                            <RecipeCard 
                                title={item.title} 
                                image={item.image} 
                                description={item.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            </Box>
            
        </Page>
        
    );
}
