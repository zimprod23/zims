import React, { useEffect, useContext } from "react";
import SearchBar from "./Sections/SearchBar";
import {
  Divider,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Actions from "./Sections/ProductActions";
import Statistics from "./Sections/Statistics";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Title from "../Title";

import { AdminOps } from "../../../components/utils/AdminOptionsProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 500,
  },
  PaperDetails: {
    height: 160,
  },
  depositContext: {
    flex: 1,
  },
}));

function ProductAnalystics(props) {
  const { id, recommand, netto, anydata } = useContext(AdminOps);
  const [AnyData, setAnyData] = anydata;
  const [nettoIncomes, setnettoIncomes] = netto;
  const [productId, setproductId] = id;
  const [isRecommanded, setisRecommanded] = recommand;
  let sum = 0;
  let nettIncom = 0;
  nettoIncomes &&
    nettoIncomes.forEach((element) => {
      sum += element.brutto;
      nettIncom += element.original;
    });
  const classes = useStyles();
  const Selledproduct = useSelector((state) => state.product.selledProduct);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <SearchBar />
      <Divider variant="middle" />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Statistics Selledproduct={Selledproduct} productId={productId} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.PaperDetails}>
                  <Title>Total incomes</Title>
                  <Typography component="p" variant="h4">
                    {/* $3,024.00 */}${sum}.00
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.depositContext}
                  >
                    {/* on 15 March, 2019 */}This month
                  </Typography>
                  <div>
                    {/* <Link color="primary" href="#" onClick={preventDefault}>
                      View balance
                    </Link> */}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.PaperDetails}>
                  <Title>Netto Incomes</Title>
                  <Typography component="p" variant="h4">
                    {/* $3,024.00 */}${sum - nettIncom}.00
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.depositContext}
                  >
                    {/* on 15 March, 2019 */}This month
                  </Typography>
                  <div>
                    {/* <Link color="primary" href="#" onClick={preventDefault}>
                      View balance
                    </Link> */}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.PaperDetails}>
                  <Title>In Stock</Title>
                  <Typography component="p" variant="h4">
                    {AnyData && AnyData.stock - AnyData.sold}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.depositContext}
                  >
                    {`Initial stock quantity : ${AnyData && AnyData.stock}`}
                  </Typography>
                  <div></div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Actions
              productId={productId}
              isRecommanded={isRecommanded}
              product={AnyData}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ProductAnalystics;
