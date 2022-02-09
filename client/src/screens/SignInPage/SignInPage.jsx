import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar, Box, Button, Container, CssBaseline,
  TextField, Typography
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";

const theme = createTheme();

export default function SignInPage() {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const SignIn = async (formData) => {
    try {
      setLoading(true);
      setError(false);

      const { data } = await axios.post("/user/login", formData, config);
      localStorage.setItem("userData", JSON.stringify(data));
      setLoading(false);
      navigate("/inbox");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          {loading && <LoadingAnimation />}
          {error && (
            <Alert
              severity="error"
              style={{
                marginTop:"3px",
                marginBottom: "8px",
                marginLeft: "20px",
                marginRight: "20px",
                textAlign: "center",
              }}
              className="alertMessage"
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit((e) => {
              SignIn(e);
            })}
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
              {...register("email", {
                required: "This field can't be empty",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
              })}
              error={errors.email}
              helperText={errors.email ? errors.email.message : ""}
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
              {...register("password", {
                required: "This field can't be empty",
                minLength: {
                  value: 6,
                  message: "Minimun 6 charecters",
                },
              })}
              error={errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
