import React from "react";
import OrderCard from "./OrderCard";
import { Grid } from "@material-ui/core";

function FullCard(props) {
  return (
    <div style={{ margin: "10px" }}>
      <Grid container spacing={2}>
        {props.graph &&
          props.graph.product.map((element, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Grid container>
                {/* <Grid item xs={6}>
                    <SliderSide images={element.picture} key={index} />
                  </Grid>
                  <Grid item xs={6}>
                    <DetailsSide details={element} key={index} />
                  </Grid> */}
                <OrderCard product={element} />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default FullCard;
