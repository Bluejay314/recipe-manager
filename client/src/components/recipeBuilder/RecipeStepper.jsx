import { Fragment, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Description, Label } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import RecipeDetailsForm from './RecipeDetailsForm';
import RecipeImageForm from './RecipeImageForm';
import { useRecipeBuildContext } from '@/context/RecipeBuildContext';
import axios from 'axios';
import { useUserContext } from '@/context/UserContext';

const steps = ['Recipe Details', 'Add an Image', 'Final'];

export default function RecipeStepper() {
    const { currentUser } = useUserContext();
    const { recipe, resetRecipe, getFormData } = useRecipeBuildContext();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => {
        resetRecipe();
        setActiveStep(0);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(`recipe tags: ${recipe.tags} type: ${typeof recipe.tags}`);
            console.log(`recipe tags split: ${recipe.tags.split(",")} type: ${typeof recipe["tags"].split(",")}`)
            const formData = getFormData();

            const response = await axios.post(`http://localhost:3010/recipes/${currentUser.id}`, formData) 
            console.log(response.data);
        } catch(err) {
            console.log(err)
        }

        handleReset();
    }

    let activeElement = <></>;
    if(activeStep === 0) activeElement = <RecipeDetailsForm />
    else if(activeStep === 1) activeElement = <RecipeImageForm />

    return (
            <Box component="form" onSubmit={handleSubmit} 
                display="flex" 
                flexDirection="column" 
                justifyContent="space-between"
                sx={{ width: "100%", height: "100%" }}
                >
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Typography variant='h6'>{steps[activeStep]}</Typography>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </Fragment>
                ) : (
                    <Fragment>                            
                        {activeElement}

                        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button onClick={handleSubmit}> Finish </Button>
                            ) : (
                                <Button onClick={handleNext}> Next </Button>
                            )}
                        </Box>
                    </Fragment>
                )}
            </Box>
    );
}

