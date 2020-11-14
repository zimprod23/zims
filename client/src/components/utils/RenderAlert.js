import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { AdminOps } from "./AdminOptionsProvider";
import { TgState } from "../views/CartPage/ToogleState";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const { alerttoogle } = useContext(TgState);
  const [AlertToogle, setAlertToogle] = alerttoogle;
  //const [Result, setResult] = result;
  const classes = useStyles();

  //   const handleClick = () => {
  //     setAlertToogle(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertToogle(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={AlertToogle}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.result}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
