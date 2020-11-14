import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import Feedback from "./FeeddbackTemple";
import Reports from "./LogReports";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  xroot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function LinearIndeterminate(props) {
  const classes = useStyles();

  return (
    <div className={classes.xroot}>
      <LinearProgress color={props.color} />
    </div>
  );
}

function ReportedServer(props) {
  const [reportedProduct, setreportedProduct] = useState(null);
  const [reports, setreports] = useState(null);
  useEffect(() => {
    Axios.get("/api/product/getFeedbacks")
      .then((res) => {
        setreportedProduct(res.data.feedbacks);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  useEffect(() => {
    Axios.get("/api/user/getReport")
      .then((res) => {
        setreports(res.data.reports);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  console.log(reportedProduct);
  return (
    <div style={{ margin: "30px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h4" gutterBottom>
              Feedbacks
            </Typography>
            {reportedProduct ? (
              <Feedback reportedProduct={reportedProduct} />
            ) : (
              <LinearIndeterminate color={"primary"} />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h4" gutterBottom>
              Reports ⚠️
            </Typography>
            {reports ? (
              <Reports reported={reports} />
            ) : (
              <LinearIndeterminate color={"secondary"} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ReportedServer;
