import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { AdminOps } from "../../components/utils/AdminOptionsProvider";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const { amountSum } = useContext(AdminOps);
  const [Amount, setAmount] = amountSum;
  let sum = 0;
  Amount &&
    Amount.forEach((element) => {
      sum += element;
    });
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {/* $3,024.00 */}${sum}.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {/* on 15 March, 2019 */}This week
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}

      <br />
      <Title>netto</Title>
      <Typography component="p" variant="h4">
        {/* $3,024.00 */}${sum}.00
      </Typography>
    </React.Fragment>
  );
}
