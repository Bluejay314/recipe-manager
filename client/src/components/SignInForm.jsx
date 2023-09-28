import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateEmail = (email) => {
    if(email.length < 1)
        return [false, "An email is required"];
    if(!emailRegex.test(email))
        return [false, "Email failed regular expression match"];

    return [true, ""]
}

const validatePassword = (password) => {
    if(password.length < 1)
        return [false, "A password is required"];
    if(password.length < 5)
        return [false, "Password must contain at least 5 letters"];

    return [true, ""]
}

export function SignInForm() {
    const [emailState, setEmailState] = useState({
        isValid:true,
        message: ""
    });

    const [passwordState, setPasswordState] = useState({
        isValid:true,
        message: ""
    });

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
            navigate("/");
        }
    };

    return (
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 1, px: "2em" }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!emailState.isValid}
                        helperText={emailState.message}
                    />
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
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, px: 3 }}
                        >
                            Sign In
                        </Button>
                        <Box>
                            Don't have an account?
                            <Link href="/account/signup" variant="body2">
                                {" Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
