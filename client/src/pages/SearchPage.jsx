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

                <Grid item container  sm gap={2} justifyContent="center">
                    {items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3}>
                            <RecipeCard recipe={item}/>
                        </Grid>
                    ))}
                </Grid>
                </Grid>
        </Page>
        
    );
}
