import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Matches emails that match:
//  - any number of letters/numbers
//  - @ symbol
//  - any number of letters/characters
//  - 2-3 letters
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//validation function for validating emails according to the regex
const validateEmail = (email) => {
    if(email.length < 1)
        return [false, "An email is required"];
    if(!emailRegex.test(email))
        return [false, "Email failed regular expression match"];

    return [true, ""]
}

// validates the password input. Must be greater than 5 characters.
const validatePassword = (password) => {
    if(password.length < 1)
        return [false, "A password is required"];
    if(password.length < 5)
        return [false, "Password must contain at least 5 letters"];

    return [true, ""]
}

export default function RegisterForm() {
    const [emailState, setEmailState] = useState({
        isValid:true,
        message: ""
    });

    const [passwordState, setPasswordState] = useState({
        isValid:true,
        message: ""
    });

    const { currentUser, handleUpdateUser } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const [emailValid, emailMessage] = validateEmail(data.get('email'));
        setEmailState({isValid: emailValid, message: emailMessage});

        const [passwordValid, passwordMessage] = validatePassword(data.get('password'));
        setPasswordState({isValid: passwordValid, message: passwordMessage})
        console.log({
            email:(emailState.isValid && emailState.message.length > 0),
            pass: (passwordState.isValid && emailState.message.length > 0)
        })

        if(emailValid  && passwordValid) {
            handleUpdateUser({email:data.get('email')});
            axios.post('http://localhost:3010/user/register', Object.fromEntries(data.entries()))
            .then(response => {
                let user = response.data.data;

                if (user) {
                    handleUpdateUser(user);
                    navigate('/');
                }
            }).catch(err => {
                console.log(err.message)
            });
            }

       
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box>
                <Typography component="h1" variant="h4" textAlign="center">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                required 
                                fullWidth 
                                id="userName" 
                                label="UserName"
                                name="userName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                required 
                                fullWidth 
                                id="email" 
                                label="Email Address" 
                                name="email" 
                                autoComplete="email"
                                error={!emailState.isValid}
                                helperText={emailState.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                required 
                                fullWidth 
                                name="password" 
                                label="Password" 
                                type="password" 
                                id="password" 
                                autoComplete="new-password"
                                error={!passwordState.isValid}
                                helperText={passwordState.message}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, alignSelf: "center" }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item>
                            Already have an account?
                            <Link href="/user/login" variant="body2">
                                {" Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
