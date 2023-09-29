import * as React from "react";
import { Box, Grid } from "@mui/material";
import { CollapsableMenu, RecipeCard } from "@/components";
import { Page } from "@/pages";
import useQuery from "@/hooks/useQuery";
import { Searcher } from "@/components/Searcher";

const defaultCategories = {
    title: "categories",
    labels: ["entree", "breakfast", "dinner", "dessert", "snack"]
};
const defaultTags = {
    title: "tags",
    labels: ["beef", "chicken", "pork", "sweet", "savoury", "salty", "sour", "drink", "food"]
};

export function SearchPage({ items }) {
    const query = useQuery();
    const searchQuery = query.get("q")? query.get("q") : "";

    return (
        <Page>
            
            <Grid container py={4}>
                <Grid item sm={3}>
                    <Searcher />
                    <CollapsableMenu title={defaultCategories.title} labels={defaultCategories.labels} />
                    <CollapsableMenu title={defaultTags.title} labels={defaultTags.labels} />
                </Grid>
                <Grid item px={4} sm>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "2em"
                    }}>
                        {items.map((item) => (<RecipeCard recipe={item}/>))}
                    </Box>
                </Grid>
            </Grid>
        </Page>
        
    );
}
