import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { RecipeCard, SideBar } from "@/components";
import { Page } from "@/pages";
import useQuery from "@/hooks/useQuery";

export function SearchPage({ items }) {
    const query = useQuery();
    const searchQuery = query.get("q")? query.get("q") : "";

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
                            <RecipeCard recipe={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            </Box>
            
        </Page>
        
    );
}
