import { Box, Grid } from "@mui/material";
import { CollapsableMenu, Header, RecipeCard } from "@/components";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import useQuery from "@/hooks/useQuery";
import NewCard from "@/components/NewCard";



export function SearchPage() {
    const [recipes, setRecipes] = useState([]);
    const { currentUser } = useUserContext();
    const headers = { "x-access-token": currentUser.token };
    const query = useQuery();
    const q = query.get("q");

    useEffect(() => {
        axios.get(`https://crossorigin.me/http://localhost:3010/recipes/${currentUser.id}/search/${q}`, {headers: headers})
            .then(response => {
                setRecipes(response.data.data);
                console.dir(recipes);
            })
            .catch(err => console.log(err.message))
    },[q]);

    
    
    return (
        <Box>
            <Header />
            <Grid container py={4}>
                <Grid item px={4} sm>
                    {recipes && (<Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "2em"
                    }}>
                        {/* {recipes.map(r => <NewCard key={r.title} recipe={r} />)} */}
                    </Box>)}
                </Grid>
            </Grid>
        </Box>
    );
}
