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

export function RegisterForm() {
    const [result, setResult] = useState('');
    const { currentUser, handleUpdateUser } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post('http://localhost:3010/user/register', Object.fromEntries(data.entries()))
        .then(response => {
            let res = response.data.result;
            let user = response.data.data;

            setResult(res);
            if (user) {
                handleUpdateUser(user);
                navigate('/search');
            }
        }).catch(err => {
            console.log(err.message)
            setResult(err.message);
        });
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
                            <TextField required fullWidth id="userName" label="User Name"name="userName"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password"/>
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
                            <Link href="/account/login" variant="body2">
                                {" Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
