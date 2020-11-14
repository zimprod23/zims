import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  CardMedia,
  makeStyles,
  Grid,
  Container,
  IconButton,
  LinearProgress,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { getSavedProducts } from "../../../actions/productsAction";
import { Link } from "react-router-dom";
import { hitLoveProduct } from "../../../actions/productsAction";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  xroot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  media: {
    height: 140,
  },
  reduction: {
    fontSize: 18,
    color: "red",
  },
}));

function ProductCards(props) {
  const dispatch = useDispatch();
  const onFavClick = () => {
    dispatch(hitLoveProduct(props.product.productId, false));
    window.location.reload();
  };
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <Link to={`/product/${props.product.productId}`}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              alt={props.product.name}
              image={props.product.overview}
              title={props.product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.product.descOverview}
              </Typography>
              <Rating
                name="product-rating"
                value={props.product.rating}
                precision={0.5}
                readOnly
              />
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button size="small" color="primary">
            {`${props.product.price} DH`}
          </Button>
          <Button size="small" color="primary" className={classes.reduction}>
            {`-${props.product.reduction}%`}
          </Button>
          <IconButton
            color="secondary"
            size="small"
            aria-label="save product"
            onClick={onFavClick}
          >
            {"UNSAVE"}
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
function LinearIndeterminate(props) {
  const classes = useStyles();

  return (
    <div className={classes.xroot}>
      <LinearProgress color="secondary" />
    </div>
  );
}

function SavedProducts(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getSavedProducts());
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {product.savedProducts ? (
            product.savedProducts.map((card, index) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <ProductCards product={card} />
              </Grid>
            ))
          ) : (
            <LinearIndeterminate />
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default SavedProducts;
