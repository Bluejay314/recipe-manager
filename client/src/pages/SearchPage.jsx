import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import { useUserContext } from "@/context/UserContext";
import useQuery from "@/hooks/useQuery";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const [recipes, setRecipes] = useState([]);
    const { currentUser } = useUserContext();
    const headers = { "x-access-token": currentUser.token };
    const query = useQuery();
    const q = query.get("q");

    useEffect(() => {
        axios.get(`http://localhost:3010/recipes/${currentUser.id}/search/${q}`, {headers: headers})
            .then(response => {
                setRecipes(response.data.data);
                console.dir(response.data);
            })
            .catch(err => console.log(err.message))
    },[q]);

    const headerColor = "rgba(255, 162, 0,0.5)";
    
    return (
        <Box display="flex" flexDirection="column" height="100vh" overflow="scroll"  backgroundColor="rgba(0, 0, 0, 0.2)">
            <Header />
            <Box  mx="22%">
                <Paper elevation={8}>
                        <Box 
                            flexDirection="column" 
                            alignContent="center" 
                            height="100vh"
                            py="4em"
                            px="2em" 
                            gap="4em" 
                            backgroundColor="white"
                        >
                       
                        <Box pb="3em">
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
