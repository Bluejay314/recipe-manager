import { useCallback, useState } from "react";
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from "react-dropzone";

export default function RecipeDetailsForm() {
    const [recipeData, setRecipeData] = useState({
        title: "",
        description: "",
        image: null
    });
    
    const [image, setImage] = useState("");

    const handleFileChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        setRecipeData(...recipeData, {image:e.target.files[0]})
    }

    const handleSubmit = (e) => {

    }

    const labelWidth = "25%";
    
    return (
        <Box component="form" onSubmit={handleSubmit} px={"1em"} display="flex" flexDirection="column" gap=".5em">
            <CssBaseline />
            <Box display="flex" alignItems="center">
                <Typography 
                    variant="subtitle1" 
                    textAlign="right" 
                    pr={2}
                    width={labelWidth} 
                    >
                    Title:
                </Typography>
                <TextField name="title" fullWidth />
            </Box>
            <Box display="flex" alignItems="baseline">
                <Typography 
                    variant="subtitle1" 
                    textAlign="right" 
                    pr={2}
                    width={labelWidth}
                >
                    Description:
                </Typography>
                <TextField name="description" multiline rows={3} fullWidth />
            </Box>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
                <Typography 
                    variant="subtitle1" 
                    textAlign="right" 
                    width={labelWidth} 
                    pr={2}
                    >
                    Image:
                </Typography>
                <input name="image" type="file" onChange={handleFileChange} />
            </Box>
            <Box alignSelf={"center"}>
                {image && <img src={image} width='100' height='100' />}
            </Box>
            
        </Box>
        
    )
}