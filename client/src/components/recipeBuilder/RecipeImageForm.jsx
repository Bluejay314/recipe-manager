import { useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { useRecipeBuildContext } from "@/context/RecipeBuildContext";

export default function RecipeImageForm() {
    const { recipe, updateRecipe } = useRecipeBuildContext();
    const [previewImage, setPreviewImage] = useState("");

    const handleImageChange = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        updateRecipe({ image: e.target.files[0] });
    }

    return (
        <Box px={"1em"} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap=".5em">
            <CssBaseline />
            <Box ml="10%"><input name="image" type="file" onChange={handleImageChange} /></Box>
            {previewImage && (<img src={previewImage} width="100" height="100" />)}
        </Box>
    );
}
