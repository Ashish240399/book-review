"use client";
// Import necessary components and functions
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { register } from "@/services/auth/register";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { hideLoader, showLoader } from "@/redux/slices/loaderSlice";
import Loader from "@/components/Loader";

// Create a default theme
const defaultTheme = createTheme();

// Define the RegisterPage component
export default function RegisterPage() {
  // Use hooks for router and dispatch
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get the current loading state from the redux store
  const loader = useAppSelector((state) => state.loader.isLoading);
  // Get the user logged in state from the redux store
  const user = useAppSelector((state) => state.user.user);

  // If loggedin then redirecting to Home Page
  if (user) {
    router.replace("/home");
  }

  // Define the submit handler for the registration form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submit action
    event.preventDefault();

    // Get the form data
    const data = new FormData(event.currentTarget);

    // Show the loader
    dispatch(showLoader());

    // Call the register function with the name, email, and password from the form data
    const response = await register({
      name: data.get("name") as string,
      password: data.get("password") as string,
      email: data.get("email") as string,
    });

    // Hide the loader
    dispatch(hideLoader());

    // Handle the response from the register function
    if (response.status == 200) {
      // If the registration was successful, redirect to the login page
      router.push("/login");
    } else if (response.status == 409) {
      // If the status is 409, show an alert that the user already exists
      alert("User already exists");
    } else if (response.status == 500) {
      // If the status is 500, show an alert that an unknown error occurred
      alert("An unknown error occurred");
    }
  };

  // Render the registration page
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
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
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {loader && <Loader />}
    </ThemeProvider>
  );
}
