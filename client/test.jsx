import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
import "./SignUpForm.css";
import SignUpImage from "../../Images/SignUpImage.svg";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import MuiAlert from "@mui/material/Alert";
import { GoogleLogin } from "react-google-login";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Render.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInForm() {
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const responseGoogle = async ({ profileObj }) => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await axios.post(
        "/renter/user/googleSignup",
        profileObj,
        config
      );
      localStorage.setItem("userData", JSON.stringify(data));
      setLoading(false);
      navigate("/userRentalInput");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const errorGoogle = () => {
    setError("Google server error try after sometime");
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let password = React.useRef({});
  password.current = watch("password", "");

  const SigUnUpButton = styled(Button)({
    color: "#ffc100",
    backgroundColor: "black",
    borderRadius: "30px",
    fontWeight: "900",
    marginTop: 30,
    marginBottom: 2,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "black",
    },
  });

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const signUp = async (formData) => {
    const { rePassword, ...rest } = formData;
    try {
      setError(false);
      setLoading(true);
      const { data } = await axios.post("/renter/user/signup", rest, config);
      setLoading(false);
      localStorage.setItem("userEmail", JSON.stringify(data.email));

      navigate("/verifyAccount");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <CssBaseline />
        <div className="title">
          <Typography
            component="h1"
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: 5,
              backgroundColor: "#ffc100",
              width: "110px",
              fontWeight: "Bold",
              borderRadius: "30px",
            }}
          >
            SIGN-UP
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          {loading && <LoadingAnimation />}
        </div>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: "90px",
                paddingRight: "90px",
              }}
            >
              <img className="signuplogo" src={SignUpImage} alt="signinImage" />
              <p style={{ textAlign: "center" }}>
                Already have an account?<Link to="/signin"> Sign in</Link>
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit((e) => {
                  signUp(e);
                })}
                noValidate
                sx={{ mt: 3, paddingLeft: "60px", paddingRight: "60px" }}
              >
                {error && (
                  <Alert
                    severity="error"
                    style={{
                      marginBottom: "12px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      textAlign: "center",
                    }}
                    className="alertMessage"
                  >
                    {error}
                  </Alert>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="firstName"
                      id="firstName"
                      label="First name"
                      variant="outlined"
                      fullWidth
                      required
                      {...register("firstName", {
                        required: "This field can't be empty",
                        minLength: {
                          value: 3,
                          message: "Minimun 3 charecters",
                        },
                      })}
                      error={errors.firstName}
                      helperText={
                        errors.firstName ? errors.firstName.message : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="lastName"
                      id="lastName"
                      label="Last name"
                      variant="outlined"
                      fullWidth
                      required
                      {...register("lastName", {
                        required: "This field can't be empty",
                      })}
                      error={errors.lastName}
                      helperText={
                        errors.lastName ? errors.lastName.message : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      id="email"
                      label="Email Id"
                      variant="outlined"
                      fullWidth
                      required
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      required
                      {...register("password", {
                        required: "This field can't be empty",
                        minLength: {
                          value: 6,
                          message: "Minimun 6 charecters",
                        },
                      })}
                      error={errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="rePassword"
                      id="rePassword"
                      label="Confirm password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      required
                      {...register("rePassword", {
                        required: "This field can't be empty",
                        validate: (value) =>
                          value === password.current ||
                          "passwords do not match",
                      })}
                      error={errors.rePassword}
                      helperText={
                        errors.rePassword ? errors.rePassword.message : ""
                      }
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid> */}
                </Grid>

                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <SigUnUpButton type="submit" variant="contained">
                    Sign up
                  </SigUnUpButton>
                  <Grid container spacing={0} sx={{ mt: 2, mb: 2 }}>
                    <Grid item xs={5} sm={5} md={5}>
                      <hr />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{
                          margin: "0",
                        }}
                      >
                        OR
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5}>
                      <hr />
                    </Grid>
                  </Grid>

                  <div className="googlesignupbutton">
                    {/* <GoogleButton label="Sign up with google" /> */}

                    <GoogleLogin
                      clientId="731359664762-76o8flcot1chav3bnkmnk71ot35ogmdp.apps.googleusercontent.com"
                      buttonText="Sign up with google"
                      onSuccess={responseGoogle}
                      onFailure={errorGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
