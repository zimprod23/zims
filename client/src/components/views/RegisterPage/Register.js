import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { register } from "../../../actions/authAction";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        HAPPAY
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [name, setname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  //handleFunctions
  const handlename = (e) => {
    setname(e.target.value);
  };
  const handlelastname = (e) => {
    setlastname(e.target.value);
  };
  const handleemail = (e) => {
    setemail(e.target.value);
  };
  const handlepass = (e) => {
    setpassword(e.target.value);
  };
  const dispatch = useDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            email: "",
            lastName: "",
            name: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string()
              //  .email("Email is invalid")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              let dataToSubmit = {
                email: values.email,
                password: values.password,
                lastName: values.lastName,
                name: values.name,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
              };

              dispatch(register(dataToSubmit))
                .then((response) => {
                  props.history.push("/emailVerification");
                })
                .catch((err) => {
                  setFormErrorMessage("Check out your informations");
                  setTimeout(() => {
                    setFormErrorMessage("");
                  }, 3000);
                });
              setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="First Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name
                          ? "text-input error"
                          : "text-input"
                      }
                      autoFocus
                    >
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lastName && touched.lastName
                          ? "text-input error"
                          : "text-input"
                      }
                    >
                      {errors.lastName && touched.lastName && (
                        <div className="input-feedback">{errors.lastName}</div>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? "text-input error"
                          : "text-input"
                      }
                      error={errors.email && touched.email}
                      helperText={
                        errors.email && touched.email
                          ? "not a valid adress"
                          : ""
                      }
                      autoComplete="email"
                    >
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error"
                          : "text-input"
                      }
                      error={errors.password && touched.password}
                      helperText={
                        errors.password && touched.password ? "not enought" : ""
                      }
                      autoComplete="current-password"
                    >
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="confirmPassword"
                      fullWidth
                      variant="outlined"
                      label="Confirm password"
                      placeholder="Enter your confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.confirmPassword && touched.confirmPassword}
                      helperText={
                        errors.confirmPassword && touched.confirmPassword
                          ? "password does not match"
                          : ""
                      }
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-input error"
                          : "text-input"
                      }
                      autoComplete="Confirm password"
                    >
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="input-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </TextField>
                  </Grid>
                  <br />
                  {formErrorMessage && (
                    <label>
                      <p
                        style={{
                          color: "#ff0000bf",
                          fontSize: "0.7rem",
                          border: "1px solid",
                          padding: "1rem",
                          borderRadius: "10px",
                        }}
                      >
                        {formErrorMessage}
                      </p>
                    </label>
                  )}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleSubmit}
                  //  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
