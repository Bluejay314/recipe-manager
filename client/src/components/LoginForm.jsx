import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { validateEmail, validatePassword } from "@/util/validation";

const EmailInput = ({ state }) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!state.isValid}
            helperText={state.message}
        />
    )
}

export function LoginForm() {
    const { currentUser, handleUpdateUser } = useUserContext();
    const [emailState, setEmailState] = useState({isValid: true, message: ""});
    const [passwordState, setPasswordState] = useState({isValid: true, message: ""});
    const [loginMessage, setLoginMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = new FormData(event.currentTarget);
        const email = userData.get('email');
        const password = userData.get('password');

        const [emailValid, emailMessage] = validateEmail(email);
        setEmailState({isValid: emailValid, message: emailMessage});

        const [passwordValid, passwordMessage] = validatePassword(password);
        setPasswordState({isValid: passwordValid, message: passwordMessage})

        if(emailValid  && passwordValid) {
            try {
                let response = await axios.post('http://localhost:3010/user/login', {
                    email: email, 
                    password: password
                });

                const loggedInUser = response.data.data;
                console.log(loggedInUser)
                handleUpdateUser(loggedInUser)
                navigate("/user/search");
                setLoginMessage("");
    
            } catch (err) {
                console.log(err.message)
                setLoginMessage(err.response? err.response.data.result : "");
            }
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box mt={2} px={4}>
                <Typography component="h1" variant="h4" textAlign="center">
                    Log in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 1, px: "2em" }}
                >
                    <EmailInput state={emailState}/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!passwordState.isValid}
                        helperText={passwordState.message}
                    />
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h6" color="red" pt={2}>
                            {loginMessage}
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, px: 3 }}
                        >
                            Sign In
                        </Button>
                        <Box>
                            Don't have an account?
                            <Link href="/account/register" variant="body2">
                                {" Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
