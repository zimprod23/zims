import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Slider from "../../utils/DtailsSlider";
import axios from "axios";
import Container from "@material-ui/core/Container";
import SimularProducts from "./sections/SinuarProduct";
import ProductInfo from "./sections/ProductInfo";
import LoadingFullScreen from "../../utils/LoadingFullScreen";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../actions/authAction";
import RenderError from "../../utils/RenderError";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  table: {
    minWidth: 700,
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
  ImageSlider: {
    backgroundColor: "black",
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
  wrapper: {
    textAlign: "center",
  },
  firstPart: {
    //backgroundColor: "#eee",
    borderRadius: "25px",
    padding: "15px",
  },
  productInfo: {
    padding: "15px",
  },
  title: {
    textAlign: "center",
  },
  title2: {
    margin: "10px auto",
  },
  buyButton: {
    padding: "10px",
  },
}));

function ProductDetails(props) {
  const user = props.user;
  const [Product, setProduct] = useState();
  const productId = props.match.params.productId;
  const dispatch = useDispatch();
  const [onError, setonError] = useState(null);
  const classes = useStyles();

  //Error renderer function

  const handleAddToCard = () => {
    dispatch(addToCart(productId))
      .then((res) => console.log("We havin good time outta here"))
      .catch((err) => window.location.replace("/signin"));
  };
  const handleDirectPayment = () => {
    handleAddToCard();
    window.location.replace("/user/cart");
  };
  function ErrorRenderer() {
    return <RenderError message={"Oooops someThing went wrong"} />;
  }
  /**
   * Fix the request down bellow
   */
  // useEffect(() => {
  //   axios
  //     .get(`/api/product/updaterating?productId=${productId}`)
  //     .then((pro) => {
  //       console.log(pro.data);
  //     })
  //     .catch((err) => {
  //       // props.history.push("/");
  //       setonError(true);
  //     });
  // }, []);

  //product/:productId
  useEffect(() => {
    axios
      .get(`/api/product/productById?id=${productId}`)
      .then((pro) => {
        setProduct(pro.data);
      })
      .catch((err) => {
        //alert("Cannot see product");
        setonError(true);
      });
  }, []);

  const images = [
    Product &&
      Product.product &&
      Product.product.picture.map((item, index) => {
        return {
          original: item,
          thumbnail: item,
        };
      }),
  ];

  console.log(images[0]);
  return (
    <div style={{ overflow: "hidden", margin: "7px auto" }}>
      <Container className={classes.firstPart}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h3" component="h4" className={classes.title}>
              {/* {Product && Product.product.name} */}
              {Product && Product.product ? (
                Product.product.name
              ) : (
                <LoadingFullScreen />
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div>
              {Product && Product.product && Product.product.picture && (
                <Slider images={images[0]} />
              )}
            </div>
          </Grid>
          {/* Here Goes the content */}
          <Grid item md={6} lg={6} xs={12} sm={12}>
            <div className={classes.productInfo}>
              {Product && Product.product && (
                <ProductInfo Product={Product} user={user} />
              )}
            </div>
            <div>
              <Grid container>
                <Grid item xs={10}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      Product &&
                      Product.product &&
                      Product.product.stock - Product.product.sold <= 0
                        ? true
                        : false
                    }
                    className={classes.buyButton}
                    onClick={handleDirectPayment}
                    fullWidth
                  >
                    Buy Now
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="primary"
                    disabled={
                      Product &&
                      Product.product &&
                      Product.product.stock - Product.product.sold <= 0
                        ? true
                        : false
                    }
                    aria-label="add to shopping cart"
                    onClick={handleAddToCard}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
      <br />
      <Grid container>
        <Typography variant="h4" component="h5" className={classes.title2}>
          Simular products
        </Typography>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {Product && Product.product && productId && (
            <SimularProducts productId={Product && Product.product._id} />
          )}
        </Grid>
      </Grid>
      <div>{onError && ErrorRenderer()}</div>
    </div>
  );
}

export default ProductDetails;
