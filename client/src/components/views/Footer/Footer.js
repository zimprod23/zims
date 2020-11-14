import React from "react";
import {
  Typography,
  Grid,
  Container,
  makeStyles,
  Divider,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "./zim2.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  subfooter: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  logo: {
    maxWidth: "6em",
    borderRadius: "10px",
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a color="inherit" href="/">
        ZimStore
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Production() {
  return (
    <div style={{ padding: "15px" }}>
      <Typography variant="body2" color="textSecondary" align="center">
        Made By ❤️ ZimProduction
      </Typography>
    </div>
  );
}
function Footer(props) {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/`}>
              <img src={Logo} className={classes.logo} />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              Community
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              <a color="inherit" href="/">
                Facebook
              </a>
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              <a color="inherit" href="/">
                Instagram
              </a>
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              <a color="inherit" href="/">
                Twitter
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              Contact
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              HamzaLouhab@gmail.com
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              ezzoubeirelasraoui@gmail.com
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              06xxxxxxxxxx
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              Got a problem?
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              <a color="inherit" href="/user/dashboard">
                Report
              </a>
            </Typography>
          </Grid>
        </Grid>
      </footer>
      <div className={classes.subfooter}>
        <Copyright />
        <Divider variant="middle" />
        <Production />
      </div>
    </div>
  );
}
/*
<div className={classes.root}>

<footer className={classes.footer}>
   <Typography variant="h6" align="center" gutterBottom>
      Footer
    </Typography> 
  <Container maxWidth="lg">
    <Grid Container>
      <Grid item xs={6}>
      <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Roses are red
        </Typography>
      </Grid>
    </Grid>
  </Container>
   <Copyright /> 
</footer>

{/* End footer 
</div>
*/
export default Footer;
