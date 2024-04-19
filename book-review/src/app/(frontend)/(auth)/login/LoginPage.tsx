"use client";
// Import necessary components and functions
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "@/services/auth/login";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUser } from "@/redux/slices/userSlice";
import { hideLoader, showLoader } from "@/redux/slices/loaderSlice";
import Loader from "@/components/Loader";

// Create a default theme
const defaultTheme = createTheme();

// Define the LoginPage component
export default function LoginPage() {
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

  // Define the submit handler for the login form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submit action
    event.preventDefault();

    // Get the form data
    const data = new FormData(event.currentTarget);

    // Show the loader
    dispatch(showLoader());

    // Call the login function with the email and password from the form data
    const response = await login(
      data.get("email") as string,
      data.get("password") as string
    );

    // Hide the loader
    dispatch(hideLoader());

    // Handle the response from the login function
    if (response.status == 200) {
      // If the login was successful, redirect to the home page and store the user data in local storage and redux store
      router.push("/home");
      localStorage.setItem(
        "user-book-review-app",
        JSON.stringify(response.data.user)
      );
      dispatch(
        setUser({
          _id: response.data.user._id,
          email: response.data.user.email,
          name: response.data.user.name,
          token: response.data.user.token,
        })
      );
    } else if (response.status == 401) {
      // If the status is 401, show an alert that the email or password was invalid
      alert("Invalid email or password");
    } else if (response.status == 404) {
      // If the status is 404, show an alert that the user was not found
      alert("User not found");
    } else {
      // If the status is anything else, show an alert that an unknown error occurred
      alert("An unknown error occurred");
    }
  };

  // Render the login page
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
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
