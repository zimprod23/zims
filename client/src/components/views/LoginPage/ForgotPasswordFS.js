import React, { useEffect, useState } from "react";
import { Box, Grid, Container, TextField, Button } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import queryString from "query-string";
import Axios from "axios";

function ForgotPasswordFS(props) {
  const [Error, setError] = useState(null);
  const [cpp, setcpp] = useState(0);
  const [Pass1, setPass1] = useState("");
  const [Pass2, setPass2] = useState("");
  const [Success, setSuccess] = useState(false);
  const query = queryString.parse(props.location.search);
  const userId = query.id;
  const onPass1Change = (e) => {
    setPass1(e.target.value);
  };
  const OnPass2Change = (e) => {
    setPass2(e.target.value);
  };

  const SuccessAlert = (
    <Alert severity="success">Password changed successfully</Alert>
  );

  const OnSubmitEmail = () => {
    let data = {
      password: Pass1,
      userId: userId,
    };
    if (Pass1.length > 5) {
      if (Pass2 === Pass1) {
        Axios.post("/api/user/ChangePassword", data)
          .then((res) => {
            setSuccess(true);
          })
          .catch((err) => {
            setError("Could not Change your password, Try Later");
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      } else {
        setError("Password does not match");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } else {
      setError("The password must contain more than 5 digits");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  useEffect(() => {
    if (cpp > 0) OnSubmitEmail();
    return () => {
      setError(null);
    };
  }, [cpp]);
  return (
    <Box p={10}>
      <Container maxWidth={"md"}>
        {Success && SuccessAlert}
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              id="pass1"
              label="Password"
              placeholder="Please Enter your new password"
              variant="outlined"
              fullWidth
              type="password"
              value={Pass1}
              onChange={onPass1Change}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="pass2"
              error={Error ? true : false}
              label="Repeat Password"
              type="password"
              placeholder="Enter your password again"
              variant="outlined"
              fullWidth
              value={Pass2}
              onChange={OnPass2Change}
              helperText={Error ? Error : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              endIcon={<ArrowForward />}
              onClick={() => setcpp(cpp + 1)}
            >
              Change My password
            </Button>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <br />
    </Box>
  );
}

export default ForgotPasswordFS;
