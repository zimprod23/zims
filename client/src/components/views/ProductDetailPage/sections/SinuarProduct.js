import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { getSimularProducts } from "../../../../actions/productsAction";
import ProductCard from "../../../utils/ProductCard";

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
}));

function SinuarProduct(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  useEffect(() => {
    props.productId &&
      dispatch(getSimularProducts(props.productId))
        .then((res) => {})
        .catch((err) => {
          alert("Data error");
        });
  }, [props.productId]);
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.cardGrid}>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {product.speceficProduct &&
            product.speceficProduct.products.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <ProductCard product={card} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default SinuarProduct;
