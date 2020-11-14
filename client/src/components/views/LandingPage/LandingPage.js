import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Skeleton } from "@material-ui/lab";
//import Link from "@material-ui/core/Link";
import { getAllProducts } from "../../../actions/productsAction";
import ImageSlider from "../../utils/ImageSlider";
import ProductCard from "../../utils/ProductCard";
import RenderError from "../../utils/RenderError";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  reduction: {
    fontSize: 18,
    color: "red",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  fakeLoader: {
    maxWidth: "350px",
    height: "300px",
  },
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const Skeletonxx = <Skeleton variant="rect" className={classes.fakeLoader} />;
  const [onError, setonError] = useState(null);
  let fakeLoader = [1, 2, 3, 4, 5, 6];
  const renderSkeleton = () => {
    return fakeLoader.map((item, index) => (
      <Grid item key={item} xs={12} sm={6} md={4}>
        {Skeletonxx}
      </Grid>
    ));
  };
  function ErrorRenderer() {
    return <RenderError message={"Oooops someThing went wrong"} />;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then((res) => {
        console.log("Yayy");
      })
      .catch((err) => {
        setonError(true);
      });
  }, []);

  const product = useSelector((state) => state.product);

  const NoProductYet = (
    <Typography variant="h4" gutterBottom>
      We don't have this Products yet
    </Typography>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ImageSlider />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}></div>
        <Container className={classes.cardGrid}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {product && product.products && product.products.Products
              ? product.products.Products.map((card) => (
                  <Grid item key={card._id} xs={12} sm={6} md={4}>
                    <ProductCard product={card} />
                  </Grid>
                ))
              : renderSkeleton()}
            {product &&
            product.products &&
            product.products.Products.length === 0
              ? NoProductYet
              : null}
          </Grid>
        </Container>
        <div>{onError && ErrorRenderer()}</div>
      </main>
    </React.Fragment>
  );
}
