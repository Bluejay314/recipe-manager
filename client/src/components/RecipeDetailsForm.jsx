import { Box, CssBaseline, TextField} from "@mui/material";
import { useRecipeBuildContext } from "@/context/RecipeBuildContext";

/*
  Component used in the 'RecipeStepper' component. Takes user input
  regarding title, tags and description.
*/
export default function RecipeDetailsForm() {
    const { recipe, updateRecipe } = useRecipeBuildContext();

    return (
        <Box px={"1em"}  display="flex" flexDirection="column" gap=".5em">
            <CssBaseline />
                {/* Get title input */}
                <TextField fullWidth required label="Title" name="title" 
                    value={recipe.title} 
                    onChange={e => updateRecipe({title: e.target.value})} />

                {/* Get tags input */}
                <TextField fullWidth label="Tags" name="tags" 
                    value={recipe.tags} 
                    onChange={e => updateRecipe({tags: e.target.value})} />

                {/* Get description input */}
                <TextField name="description" label="description" multiline rows={3} fullWidth
                    value={recipe.description} 
                    onChange={e => updateRecipe({description: e.target.value})} />
        </Box>
    )
}