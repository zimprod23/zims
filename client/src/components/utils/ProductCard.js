import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { CardActionArea, Chip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Warning } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  reduction: {
    fontSize: 18,
    color: "red",
  },
  chip: {
    margin: theme.spacing(1),
  },
  desc: {
    wordWrap: "break-word",
  },
}));

function ProductCards(props) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <a href={`/product/${props.product._id}`}>
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
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.desc}
              >
                {props.product.descOverview}
              </Typography>

              <Rating
                name="product-rating"
                value={props.product.rating}
                precision={0.5}
                readOnly
              />
              <br />
              {props.product.stock - props.product.sold <= 0 ? (
                <>
                  <Chip
                    label="Out Of Stock"
                    color="secondary"
                    icon={<Warning />}
                  />
                </>
              ) : null}
            </CardContent>
          </CardActionArea>
        </a>
        <CardActions>
          <Button size="small" color="primary">
            {`${props.product.price} $`}
          </Button>
          <Button size="small" color="primary" className={classes.reduction}>
            {`-${props.product.reduction}%`}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductCards;
