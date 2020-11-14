import React from "react";
import { Grid, Button } from "@material-ui/core";

function DetailsSide(props) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          {props.details.name}
          <br />
          {props.details.price}
          <br />
          {props.details.quantity}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Done
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailsSide;
