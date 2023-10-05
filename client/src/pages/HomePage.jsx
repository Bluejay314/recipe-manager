import { Header, RecipeCard } from "@/components";
import NewCard from "@/components/NewCard";
import { useRecipes } from "@/hooks/useRecipes";
import { Box, Grid, Paper, Typography } from "@mui/material";

export function HomePage() {
    const recipes = useRecipes(8);

    const recipeItems = recipes.map((recipe, i) => (
        <Grid key={i + recipe.title} item sm={12} md={3} xl={2}>
            <NewCard  recipe={recipe} />
        </Grid>
    ));

    const headerColor = "rgba(255, 162, 0,0.5)";

    return (
       <Box display="flex" flexDirection="column" flexGrow="1"  backgroundColor="rgba(0, 0, 0, 0.2)">
            <Header />
            <Box  mx="22%">
                <Paper elevation={8}>
                        <Box 
                            flexDirection="column" 
                            alignContent="center" 
                            py="4em"
                            px="2em" 
                            gap="4em" 
                            backgroundColor="white"
                        >
                        <Box pb="3em">
                            <Typography pl={3} py="0.25em" mb="0.5em" variant="h5" fontFamily="Raleway" fontWeight={600} sx={{
                                backgroundColor: headerColor
                            }}>Recently Viewed</Typography>
                            <Grid container gap="2em" justifyContent="flex-start">
                                {recipeItems}
                            </Grid>
                        </Box>
                        <Box pb="3em">
                            <Typography pl={3} py="0.25em" mb="0.5em" variant="h5" fontFamily="Raleway" fontWeight={600} sx={{
                                backgroundColor: headerColor
                            }}>Favourites</Typography>
                            <Grid container gap="2em" justifyContent="flex-start">
                                {recipeItems}
                            </Grid> 
                        </Box>
                        <Box pb="3em">
                            <Typography pl={3} py="0.25em" mb="0.5em" variant="h5" fontFamily="Raleway" fontWeight={600} sx={{
                                backgroundColor: headerColor
                            }}>Recent</Typography>
                            <Grid container gap="2em" justifyContent="flex-start">
                                {recipeItems}
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
       
    );
}