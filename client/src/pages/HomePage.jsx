import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import { useUserContext } from "@/context/UserContext";
import { useRecipes } from "@/hooks/useRecipes";
import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
    let recipes = useRecipes("-1");
    const [favourites, setFavourites] = useState();
    const { currentUser } = useUserContext();
    console.log(`userId: ${typeof currentUser.id}`);

    useEffect(() => {
        try {
            axios.get(`http://localhost:3010/recipes/${currentUser.id}/favourites`)
                .then(response => {
                    setFavourites(response.data.data); 
                    console.log(response.data)
                })
        }
        catch(err) {
            console.log(err.message)
        }
    }, [currentUser])

    const headerColor = "rgba(255, 162, 0,0.5)";

    return (
       <Box display="flex" flexDirection="column" height="100vh" overflow="scroll"  backgroundColor="rgba(0, 0, 0, 0.2)">
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
                            }}>Favourites</Typography>
                            <Grid container gap="2em" justifyContent="flex-start">
                            {favourites && favourites.map((r, i) => (
                                    <Grid key={i + r.title} item sm={12} md={3} xl={2}>
                                        <RecipeCard  recipe={r} />
                                    </Grid>
                                ))}
                            </Grid> 
                        </Box>
                        <Box pb="3em">
                            <Typography pl={3} py="0.25em" mb="0.5em" variant="h5" fontFamily="Raleway" fontWeight={600} sx={{
                                backgroundColor: headerColor
                            }}>Recently Added</Typography>
                            <Grid container gap="2em" justifyContent="flex-start">
                                {recipes?.map((recipe, i) => (
                                    <Grid key={i + recipe.title} item sm={12} md={3} xl={2}>
                                        <RecipeCard  recipe={recipe} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
       
    );
}