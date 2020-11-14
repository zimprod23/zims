import React from "react";
import {
  Paper,
  Grid,
  Container,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles,
  Button,
} from "@material-ui/core";
import moment from "moment";
import { dropHistory } from "../../../actions/authAction";
import { useDispatch } from "react-redux";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function History(props) {
  function createData(overview, name, price, quantity, dateOfPurchase) {
    return { overview, name, price, quantity, dateOfPurchase };
  }

  const rows = [
    props.user.history.map((item, index) => {
      return createData(
        item.overview,
        item.name,
        item.price,
        item.quantity,
        item.dateOfPurchase
      );
    }),
  ];
  const dispatch = useDispatch();
  const deleteHis = () => {
    dispatch(dropHistory());
  };

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div style={{ float: "right" }}>
            {rows[0].length > 0 ? (
              <Button href="#" color="primary" onClick={deleteHis}>
                CLEAR HISTORY
              </Button>
            ) : (
              <Button href="#" color="primary">
                HISTORY IS CLEAR
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Picture</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows[0].map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <img
                        src={row.overview}
                        alt={row.name}
                        style={{ maxWidth: "300px" }}
                      />
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {moment(row.dateOfPurchase).format("YYYY-MM-DD")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
