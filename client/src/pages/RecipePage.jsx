import useQuery from "@/hooks/useQuery";
import { Page } from "@/pages";
import recipes from "../data/allrecipes";
import { Box, Card, Grid, Typography } from "@mui/material";
import { SideBar } from "@/components";

export function RecipePage() {
    const query = useQuery();
    const recipeId = query.get("q");
    const recipe = recipes.find((r) => r.id == recipeId);

    const ingredients = recipe.ingredients.map((ing) => (
        <Box display="flex" alignItems="center">
            <Typography variant="body1">
                {`${ing.quantity} ${ing.unit} ${ing.name}`}
            </Typography>
        </Box>
    ));

    return (
        <Page>
            <Grid container>
                <Grid item md={3} sx={{display: { sm: "none", md: "block" }}}>
                    <SideBar />
                </Grid>

                <Grid item container md p={4}>
                    {/* Image Section */}
                    <Grid item sm={12} md={5}>
                        <img src={recipe.image} />
                    </Grid>

                    {/* Header Section */}
                    <Grid item sm={12} md={7}>
                        <Typography variant="h3">{recipe.title}</Typography>
                        <Typography variant="body1">{recipe.description}</Typography>
                    </Grid>

                    {/* Ingredients Section */}
                    <Grid item sm={12} md>
                        <Typography variant="h6">Ingredients</Typography>
                        {ingredients}
                    </Grid>

                    {/* Method Section */}
                    <Grid item sm={12} md>
                        <Typography variant="h6">Method</Typography>
                        <Typography variant="body1">
                            {recipe.method.map((step, i) => (
                                <Box key={i} pb={2}>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Step {i + 1}
                                    </Typography>
                                    <Typography variant="body1">
                                        {step}
                                    </Typography>
                                </Box>
                            ))}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    );
}
