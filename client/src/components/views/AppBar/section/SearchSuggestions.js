import React from "react";
import "./searchStyle.css";
import { Grid, Container, Divider } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

function SearchSuggestions(props) {
  return (
    <div>
      {props.suggestedProduct && (
        <Container maxWidth="sm" className={"rootContainer"} fixed>
          <ul className="Sub-Menu">
            {props.suggestedProduct.products ? (
              props.suggestedProduct.products.map((item, index) => (
                <a href={`/product/${item._id}`}>
                  <li key={index}>
                    <Container maxWidth="sm">
                      <Grid container>
                        <Grid item xs={"12"} md={"5"} lg={"5"} sm={"5"}>
                          <img
                            src={item.overview}
                            alt={item.name}
                            style={{ width: "150px" }}
                          />
                        </Grid>

                        <Grid item xs={"12"} md={"7"} lg={"7"} sm={"7"}>
                          <Grid container>
                            <Grid item xs={"12"}>
                              {item.name}
                            </Grid>
                            <Grid item xs={"12"}>
                              <p
                                style={{ fontSize: "12px", color: "darkgrey" }}
                              >
                                {item.descOverview}
                              </p>
                            </Grid>
                            <Grid item xs={"12"}>
                              <Rating
                                name="product-rating"
                                value={item.rating}
                                precision={0.5}
                                readOnly
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Container>
                    <br />
                    <Divider variant="middle" />
                  </li>
                </a>
              ))
            ) : (
              <p>NoThing found</p>
            )}
          </ul>
        </Container>
      )}
    </div>
  );
}

export default SearchSuggestions;
