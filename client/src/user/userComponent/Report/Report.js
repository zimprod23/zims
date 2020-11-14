import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Grid,
  Snackbar,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { OnReportSubmit } from "../../../actions/authAction";
import MuiAlert from "@material-ui/lab/Alert";

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
function Report() {
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const [messageText, setmessageText] = useState("");
  const [messageType, setmessageType] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopen(false);
  };
  function Result(message) {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={messageType}>
          {messageText}
        </Alert>
      </Snackbar>
    );
  }
  const [Report, setReport] = useState("");
  const onReportChange = (e) => {
    setReport(e.target.value);
  };
  const onReportSubmitted = () => {
    let data = {
      comment: Report,
    };
    if (Report == "") {
      alert("please fill the input");
    } else {
      dispatch(OnReportSubmit(data))
        .then((res) => {
          setmessageText("Report submitted with success");
          setmessageType("success");
          setopen(true);
        })
        .catch((err) => {
          setmessageText("Failed to submit report");
          setmessageType("error");
          setopen(true);
        });
      //window.location.reload();
    }
  };
  return (
    <div>
      <Container maxWidth={"lg"}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Report"
              fullWidth
              multiline
              rows={6}
              //defaultValue="incase you want to report a product just leave a feedback we review them all"
              placeholder="incase you want to report a product just leave a feedback we review them all"
              variant="outlined"
              value={Report}
              onChange={onReportChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={onReportSubmitted}
            >
              Submit Report
            </Button>
          </Grid>
        </Grid>
      </Container>
      {Result()}
    </div>
  );
}

export default Report;
