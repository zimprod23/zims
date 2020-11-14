import React, { useState, useEffect, useContext } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import {
  Divider,
  Typography,
  Button,
  IconButton,
  Chip,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Vote from "./Vote";
import {
  RemoveRedEye,
  RateReview,
  Favorite,
  Feedback,
  Warning,
} from "@material-ui/icons";
import { hitLoveProduct } from "../../../../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import { TgState } from "../../CartPage/ToogleState";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  desc: {
    wordWrap: "break-word",
  },
  button: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
  },
}));
function ProductInfo(props) {
  const dispatch = useDispatch();
  const [isSaved, setisSaved] = useState(null);
  const [voteOpen, setvoteOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const onSendFeedback = () => {
    setToogle(true);
  };

  useEffect(() => {
    auth.user &&
    auth.user.user.saved.find((id) => id.productId == rows.id) != undefined
      ? setisSaved(true)
      : auth.user && setisSaved(false);
    console.log("saved is " + isSaved);
  }, [auth.user]);

  const classes = useStyles();
  function createData(
    name,
    price,
    rating,
    description,
    categorie,
    views,
    dimentions,
    brand,
    id,
    raters
  ) {
    return {
      name,
      price,
      rating,
      description,
      categorie,
      views,
      dimentions,
      brand,
      id,
      raters,
    };
  }
  const rows =
    props.Product &&
    props.Product.product &&
    createData(
      props.Product.product.name,
      props.Product.product.price,
      props.Product.product.rating,
      props.Product.product.description,
      props.Product.product.categorie,
      props.Product.product.views,
      props.Product.product.dimentions,
      props.Product.product.brand,
      props.Product.product._id,
      props.Product.product.raters
    );
  const onFavClick = () => {
    dispatch(hitLoveProduct(rows.id, !isSaved));
    //window.location.reload();
  };
  const RenderDescription = () => {
    const classes = useStyles();
    return (
      <Grid Container spacing={2}>
        <Grid item>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.desc}
          >
            {rows.description}
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item>
          <Typography variant="h5" gutterBottom>
            {`${rows.views} `}
            <RemoveRedEye fontSize="small" />
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item>
          <Typography variant="body1" gutterBottom>
            Brand : {rows.brand}
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item>
          <Typography variant="body1" gutterBottom>
            dimentions\size : {rows.dimentions}
          </Typography>
        </Grid>
        <Divider variant="middle" />
        {/* {props.Product.product.stock - props.Product.product.sold <= 0 ? (
          <>
            <br />
            <Chip label="Out Of Stock" color="secondary" icon={<Warning />} />
            <br />
          </>
        ) : null} */}
        <Grid item>
          <Typography variant="subtitles1" gutterBottom>
            <Rating
              name="product-rating"
              value={rows.rating}
              precision={0.5}
              readOnly
            />
            ({rows.raters})
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item>
          {props.Product &&
          props.Product.product &&
          props.Product.product.keywords.length > 0 ? (
            <>
              {props.Product.product.keywords.map((item, index) => (
                <Chip
                  className={classes.chip}
                  label={item}
                  key={index}
                  color="primary"
                />
              ))}
              <Divider variant="middle" />
            </>
          ) : null}
        </Grid>

        <Grid item>
          <Typography variant="h5" gutterBottom>
            {`${rows.price} $`}
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item>
          {/* <Button
            variant="outlined" 
            color="secondary"
            className={classes.button}
            startIcon={<RateReview />}
          >
            Rate
          </Button> */}
          <IconButton
            color={isSaved ? "secondary" : "outlined"}
            aria-label="save product"
            onClick={onFavClick}
          >
            <Favorite fontSize="large" />
          </IconButton>{" "}
          <IconButton
            color={"secondary"}
            aria-label="send Feedback"
            onClick={onSendFeedback}
          >
            <Feedback fontSize="large" />
            {Toogle && <Vote productId={rows.id} />}
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  return <div>{RenderDescription()}</div>;
}
/**
 *  <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            {rows.description}
          </Typography>
 */
export default ProductInfo;
