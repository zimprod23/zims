import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./ImageSlider.css";
import ImportantAdd from "./ImportantAdd";
import Slider from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingProducts } from "../../actions/productsAction";
import { Skeleton } from "@material-ui/lab";

import RenderError from "../utils/RenderError";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  wrapper: {
    textAlign: "center",
  },
  fakeLoader: {
    maxWidth: "900px",
    height: "500px",
  },
}));

function ImageSlider(props) {
  const dispatch = useDispatch();
  const [onError, setonError] = useState(false);
  function ErrorRenderer() {
    return <RenderError message={"Oooops someThing went wrong"} />;
  }
  const trendingProduct = useSelector((state) => state.product.trendingProduct);
  useEffect(() => {
    dispatch(getTrendingProducts())
      .then((res) => {
        console.log(".");
      })
      .catch((err) => {
        setonError(true);
      });
  }, []);

  const images = [
    trendingProduct &&
      trendingProduct.products.map((item, index) => {
        return {
          original: item.overview,
          thumbnail: item.overview,
          description: item.descOverview,
          originalTitle: `/product/${item._id}`,
        };
      }),
  ];
  const redirectTo = (index) => {
    //trendingProduct && console.log(trendingProduct.products[index]._id);
    trendingProduct &&
      trendingProduct.products[index] &&
      (window.location.href = `/product/${trendingProduct.products[index]._id}`);
  };
  const classes = useStyles();
  const Skeletonxx = <Skeleton variant="rect" className={classes.fakeLoader} />;
  return (
    <div style={{ overflow: "hidden" }}>
      <Grid container spacing={3} className={classes.wrapper}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <div>
            {trendingProduct && trendingProduct.products ? (
              <Slider images={images[0]} redirectTo={redirectTo} />
            ) : (
              Skeletonxx
            )}
          </div>
        </Grid>
        <Grid item md={4} lg={4} xs={12} sm={12}>
          <div>
            <ImportantAdd />
          </div>
        </Grid>
      </Grid>
      <div>{onError && ErrorRenderer()}</div>
    </div>
  );
}

export default ImageSlider;
