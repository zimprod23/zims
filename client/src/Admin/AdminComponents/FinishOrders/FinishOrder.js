import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid, Button, Container, Typography } from "@material-ui/core";
import FullCard from "./Sections/FullCard";

function FinishOrder(props) {
  const [graph, setgraph] = useState();
  const fetchUnFinishedPayment = async () => {
    await Axios.get("/api/product/finishPayment")
      .then((res) => {
        setgraph(res.data.graph);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FinishOrder = (id) => {
    Axios.patch(`/api/product/finishOrder?orderId=${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchUnFinishedPayment();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        {graph &&
          graph.map((item, index) => (
            <Grid container>
              <Grid item xs={12}>
                <FullCard graph={item} key={index} />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Typography variant="h6" color="textSecondary" component="p">
                    <Grid item xs={6}>
                      {`name : ${item.user[0].name}`}
                      <br />
                      {`lastname : ${item.user[0].lastname}`}
                      <br />
                      {`email : ${item.user[0].email}`}
                    </Grid>
                  </Typography>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      {`Adresses : ${
                        item.data[0].Coordinates.BuyerData.adress1
                      } / 
                    ${
                      item.data[0].Coordinates.BuyerData.adress2
                        ? item.data[0].Coordinates.BuyerData.adress2
                        : "no second adress"
                    }`}
                      <br />
                      {`Country : ${item.data[0].Coordinates.BuyerData.country}`}
                      <br />
                      {`City : ${item.data[0].Coordinates.BuyerData.city}`}
                      <br />
                      {`ZIP : ${item.data[0].Coordinates.BuyerData.zip}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => FinishOrder(item._id)}
                    >
                      Finish Order
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Container>
    </div>
  );
}

export default FinishOrder;
