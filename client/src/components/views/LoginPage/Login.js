import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/authAction";
import Axios from "axios";
import { TgState } from "../CartPage/ToogleState";
import { Alert } from "@material-ui/lab";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Happay
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Modal = (props) => {
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const [open, setOpen] = useState(Toogle);
  const [Error, setError] = useState(null);
  const [cpp, setcpp] = useState(0);
  const [TargetEmail, setTargetEmail] = useState("");
  const [Success, setSuccess] = useState(false);

  const onEmailChange = (e) => {
    setTargetEmail(e.target.value);
  };
  const OnSubmitEmail = () => {
    let data = {
      email: TargetEmail,
    };
    if (TargetEmail) {
      Axios.post("/api/user/PasswordReset", data)
        .then((res) => {
          setSuccess(true);
          setTimeout(() => {
            setToogle(false);
          }, 7000);
        })
        .catch((err) => {
          setError("Invalid email please try again");
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    } else {
      alert("Please fill email fieled");
    }
  };
  useEffect(() => {
    if (cpp > 0) OnSubmitEmail();
    return () => {
      setError(null);
    };
  }, [cpp]);

  const handleClose = () => {
    setToogle(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Password Reset</DialogTitle>
        {Success && (
          <Alert severity="success">
            Please check your Inbox, We have sent you a link to reset your
            password
          </Alert>
        )}
        <DialogContent>
          <DialogContentText>
            To Reset your password please Enter a correct adress
          </DialogContentText>
          <TextField
            id="Email"
            error={Error ? true : false}
            label="Email"
            placeholder="Please Enter your Email"
            fullWidth
            value={TargetEmail}
            onChange={onEmailChange}
            helperText={Error ? Error : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={OnSubmitEmail} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default function SignInSide(props) {
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const classes = useStyles();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  const dispatch = useDispatch();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              email: initialEmail,
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                //  .email("Email is invalid")
                .required("Email is required"),
              password: Yup.string()
                .min(4, "Password must be at least 6 characters")
                .required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                let dataToSubmit = {
                  email: values.email,
                  password: values.password,
                };

                dispatch(login(dataToSubmit))
                  .then((response) => {
                    if (rememberMe)
                      window.localStorage.setItem("rememberMe", values.email);
                    props.history.push("/");
                  })
                  .catch((err) => {
                    setFormErrorMessage(
                      "Check out your Account from catch block or Password again"
                    );
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
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  >
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </TextField>

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  >
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </TextField>
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        onChange={handleRememberMe}
                        checked={rememberMe}
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        onClick={() => {
                          setToogle(true);
                        }}
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              );
            }}
          </Formik>
          {Toogle && <Modal />}
        </div>
      </Grid>
    </Grid>
  );
}
