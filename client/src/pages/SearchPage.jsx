import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { RecipeCard } from "@/components";
import { Page } from "@/pages";

export function SearchPage({ items }) {
    return (
        <Page>
            <Box py={4} px={12}>
                <Grid container spacing={2}>
                    {items.map((item) => (
                        <Grid xs={12} sm={6} md={4} lg={3}>
                            <RecipeCard 
                                title={item.title} 
                                image={item.image} 
                                description={item.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Page>
        
    );
}
