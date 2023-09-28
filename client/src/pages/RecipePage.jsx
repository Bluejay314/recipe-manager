import useQuery from "@/hooks/useQuery";
import { Page } from "@/pages";
import recipes from "../data/allrecipes";
import { Box, Grid, Typography } from "@mui/material";
import { CollapsableMenu } from "@/components";

const defaultOptions = {
    title: "actions",
    labels: ["edit", "share", "delete", "branch"]
};

export function RecipePage() {
    const query = useQuery();
    const recipeId = query.get("q");
    const recipe = recipes.find((r) => r.id == recipeId);

    const ingredients = recipe.ingredients.map((ing) => (
            <Typography variant="body1">
                {`${ing.quantity} ${ing.unit} ${ing.name}`}
            </Typography>
    ));

    const steps = recipe.method.map((step, i) => (
        <Box key={i} pb={2}>
            <Typography variant="subtitle1" fontWeight={600}>
                Step {i + 1}
            </Typography>
            <Typography variant="body1">
                {step}
            </Typography>
        </Box>
    ));

    return (
        <Page>
            <Grid container p={4}>
                <Grid item md={3} sx={{display: { sm: "none", md: "block" }}}>
                    <Box>
                        <CollapsableMenu title={defaultOptions.title} labels={defaultOptions.labels} />
                    </Box>
                </Grid>

                <Grid item container md pl={4} height="100%">
                    {/* Image Section */}
                    <Grid item  pb={6} sm={12} md={5}>
                        <img src={recipe.image} />
                    </Grid>

                    {/* Header Section */}
                    <Grid item pl={4} pb={6} sm={12} md={7} >
                        <Typography variant="h4" pb={4} maxHeight="60%" overflow="hidden">
                            {recipe.title}
                        </Typography>
                        <Typography variant="body1">{recipe.description}</Typography>
                    </Grid>

                    {/* Ingredients Section */}
                    <Grid item sm={12} md>
                        <Typography variant="h5" fontWeight="bold" pb={2}>
                            Ingredients
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {ingredients}
                        </Box>
                    </Grid>

                    {/* Method Section */}
                    <Grid item sm={12} md>
                        <Typography variant="h5" fontWeight="bold" pb={2}>
                            Method
                        </Typography>
                        <Typography variant="body1">
                            {steps}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    );
}
