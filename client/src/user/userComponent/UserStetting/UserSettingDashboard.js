import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Grid,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Divider,
} from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import { ChangeCred, SuspendAccount } from "../../../actions/authAction";
import { useDispatch } from "react-redux";
import { TgState } from "../../../components/views/CartPage/ToogleState";

function AlertDialog(props) {
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const [open, setOpen] = useState(Toogle);
  const dispatch = useDispatch();
  const handlesuspend = () => {
    dispatch(SuspendAccount())
      .then((res) => {
        alert("Your Account is Successfully deleted,Good bye 😢");
        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch((err) => {
        alert("Oooops something went wrong, try later");
      });
  };

  const handleClose = () => {
    setToogle(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handlesuspend}
            color="secondary"
            variant="contained"
            autoFocus
            endIcon={<Warning />}
          >
            delete it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function UserSettingDashboard(props) {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const dispatch = useDispatch();
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const [name, setname] = useState({
    name: "",
    lastname: "",
  });
  const onPassChange = (e) => {
    setpass(e.target.value);
  };
  const onEmailChange = (e) => {
    setemail(e.target.value);
  };
  const onNameChange = (e) => {
    switch (e.target.name) {
      case "newname":
        setname({ ...name, name: e.target.value });
        break;
      case "newlastname":
        setname({ ...name, lastname: e.target.value });
        break;
    }
  };

  const SubmitEmail = () => {};
  const SubmitName = () => {
    if (!name.name || !name.lastname) {
      alert("Please fill the missing input");
    } else {
      let data = {
        newname: name.name,
        newlastname: name.lastname,
        command: "Change_name",
      };
      dispatch(ChangeCred(data))
        .then((res) => {
          alert("Your is data changed with success");
          window.location.reload();
        })
        .catch((err) => {
          alert("Oooops something went wrong, try later");
        });
    }
  };
  const SubmitPass = () => {
    if (!pass) {
      alert("Please fill the missing input");
    } else {
      let data = {
        password: pass,
        command: "Change_password",
      };
      dispatch(ChangeCred(data))
        .then((res) => {
          alert("Your password is changed with success");
          window.location.reload();
        })
        .catch((err) => {
          alert("Oooops something went wrong, try later");
        });
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              variant="outlined"
              required
              id="newemail"
              name="newemail"
              label="New Email"
              fullWidth
              type="email"
              autoComplete="given-name"
              value={email}
              onChange={onEmailChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={SubmitEmail}
            >
              Apply
            </Button>
          </Grid>
           */}
          <Divider variant="middle" />
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <TextField
              variant="outlined"
              required
              id="newname"
              name="newname"
              label="New Name"
              fullWidth
              autoComplete="given-name"
              value={name.name}
              onChange={onNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <TextField
              variant="outlined"
              required
              id="newlastname"
              name="newlastname"
              label="New lastname"
              fullWidth
              value={name.lastname}
              onChange={onNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={SubmitName}
            >
              Apply
            </Button>
          </Grid>
          <Divider variant="middle" />
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              variant="outlined"
              required
              id="newpass"
              name="newpass"
              label="New Password"
              fullWidth
              type="password"
              value={pass}
              onChange={onPassChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={SubmitPass}
            >
              Apply
            </Button>
          </Grid>
          <Divider variant="middle" />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Warning fontSize="large" />}
            size="large"
            onClick={() => setToogle(true)}
          >
            Delete my account?
          </Button>
        </Grid>
        {Toogle && <AlertDialog />}
      </Container>
    </div>
  );
}

export default UserSettingDashboard;
