import React, { useEffect, useState } from "react";
import Axios from "axios";
import queryString from "query-string";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function EmailVerification(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const query = queryString.parse(props.location.search);
  const userId = query.id;

  useEffect(() => {
    Axios.patch(`/api/user/AccountVerification?id=${userId}`)
      .then((res) => {
        if (res.data.success) {
          window.location.replace("/signin");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <div>
      <p>the user id is : {userId}</p>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default EmailVerification;
