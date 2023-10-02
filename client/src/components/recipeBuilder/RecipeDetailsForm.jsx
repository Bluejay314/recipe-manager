import { useState } from "react";
import { Box, CssBaseline, TextField, Typography } from "@mui/material";
import { useRecipeBuildContext } from "@/context/RecipeBuildContext";

export default function RecipeDetailsForm() {
    const { recipe, updateRecipe } = useRecipeBuildContext();
    
    return (
        <Box px={"1em"}  display="flex" flexDirection="column" gap=".5em">
            <CssBaseline />
                <TextField fullWidth required label="Title" name="title" 
                    value={recipe.title} 
                    onChange={e => updateRecipe({title: e.target.value})} />


                <TextField fullWidth label="Tags" name="title" 
                    value={recipe.title} 
                    onChange={e => updateRecipe({title: e.target.value})} />


                <TextField name="description" label="description" multiline rows={3} fullWidth
                    value={recipe.description} 
                    onChange={e => updateRecipe({description: e.target.value})} />
        </Box>
    )
}