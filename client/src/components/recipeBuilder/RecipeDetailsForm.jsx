import { useCallback, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from "react-dropzone";

export default function RecipeDetailsForm() {
    const [recipeData, setRecipeData] = useState({});
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {'image/png': ['.png', '.jpg', '.jpeg']},
        onDrop
    })

    return (
        <Box
            component="form" 
            display="flex" 
            flexDirection="column" 
            gap={2}
        >
            <TextField margin="dense" fullWidth required
                type="text"
                name="recipeTitle"
                label="Title"
                id="recipeTitle"
            />
            <Box display="flex" justifyContent="center" {...getRootProps()}>
                <input {...getInputProps()} />
                <Box 
                    p="3em 1em" 
                    width="60%" 
                    border="0.2em dashed rgba(0,0,0,0.1)"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                        backgroundColor:"rgba(0,0,0,0.1)", 
                        borderRadius:"0.75em"
                    }}>
                <Typography textAlign="center">
                    {
                        isDragActive ? 
                        "Drop the files here ..." : 
                        "Drag 'n' drop some files here, or click to select files"
                    }
                </Typography>
                <CloudUploadIcon />
                </Box>
            </Box>
        </Box>
    )
}