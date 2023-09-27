import useQuery from "@/hooks/useQuery";
import { Page } from "@/pages";
import recipes from "../data/allrecipes";
import { Box, Card, Typography } from "@mui/material";
import { SideBar } from "@/components";

export function RecipePage() {
    const query = useQuery();
    const recipeId = query.get("q");
    const recipe = recipes.find(r => r.id = recipeId);

    const ingredients = recipe.ingredients.map(ing => (
        <Box display="flex" alignItems="center">
            <Typography variant="body1">
                {`${ing.quantity} ${ing.unit} ${ing.name}`}
            </Typography>  
        </Box>
    ));

    return (
        <Page>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "20% 80%",
                gap: "2em",
                py: "2em"
            }}>
                <SideBar />
                <Box >
                    <Typography variant="h2">{recipe.title}</Typography>
                    <Typography variant="body1">{recipe.description}</Typography>
                    {/* <img src={recipe.image} /> */}

                    <Typography variant="h6">Ingredients</Typography>
                    {ingredients}

                    <Typography variant="h6">Method</Typography>
                    <Typography variant="body1">{recipe.method}</Typography>
                </Box>
            </Box>
        </Page>
    )
}