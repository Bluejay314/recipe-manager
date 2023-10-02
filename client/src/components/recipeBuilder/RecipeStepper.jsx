import { Fragment, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Label } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import RecipeDetailsForm from './RecipeDetailsForm';


const steps = ['Recipe Details', 'Final'];

export default function RecipeStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const recipe = {};

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
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
                    <Typography textAlign="center" sx={{ mt: 2, mb: 1 }}>
                        Step {activeStep + 1}
                    </Typography>

                    {activeStep === 0 && <RecipeDetailsForm />}

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </Fragment>
            )}
        </Box>
    );
}

