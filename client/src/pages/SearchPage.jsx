import { Box, Grid } from "@mui/material";
import { CollapsableMenu, Header, RecipeCard } from "@/components";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";



export function SearchPage() {
    const [recipes, setRecipes] = useState([]);
    const { currentUser } = useUserContext();
    const headers = { "x-access-token": currentUser.token }

    useEffect(() => {
        axios.get(`http://localhost:3010/recipes/all/${currentUser.id}`, {headers: headers})
            .then(response => setRecipes(response.data.data))
            .catch(err => console.log(err.message))
    },[])


    
    return (
        <Box>
            <Header />
            <Grid container py={4}>
                <Grid item px={4} sm>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "2em"
                    }}>
                        {recipes.map(r => <RecipeCard key={r.title} recipe={r} />)}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
