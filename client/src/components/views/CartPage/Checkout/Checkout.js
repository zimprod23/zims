import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import Review from "./Review";
import { TgState } from "../ToogleState";
import Paypal from "../../../utils/Paypal";
import { useDispatch, useSelector } from "react-redux";
import { onSuccesBy } from "../../../../actions/authAction";
import { v4 as uuidv4 } from "uuid";
import RenderAlert from "../../../utils/RenderAlert";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details"];
//const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout(props) {
  const orderId = uuidv4();
  const { buyer, alerttoogle } = useContext(TgState);
  const [BuyerData, setBuyerData] = buyer;
  const [AlertToogle, setAlertToogle] = alerttoogle;
  const [Success, setSuccess] = useState(false);
  const RenderResult = (state, message) => {
    return <RenderAlert result={state} message={message} />;
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      // case 1:
      //   return <PaymentForm />;
      case 1:
        return (
          <Review
            products={props.products}
            Total={props.toPay}
            userCords={BuyerData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  //Payment tools
  const dispatch = useDispatch();
  const CardData = useSelector((state) => state.auth.cartDetail);
  const transactionSuccess = (data) => {
    dispatch(
      onSuccesBy({
        cartDetail: CardData,
        paymentData: {
          data: data,
          Coordinates: { orderId, BuyerData, total: props.toPay },
        },
      })
    )
      .then((response) => {
        // setShowSuccess(true);
        // setShowTotal(false);
        setActiveStep(activeStep + 1);
        setAlertToogle(true);
        setSuccess(true);
      })
      .catch((err) => {
        //alert(err);
        setAlertToogle(true);
        setSuccess(false);
      });
  };

  const transactionError = () => {
    console.log("Paypal error");
  };

  const transactionCanceled = () => {
    console.log("Transaction canceled");
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    console.log(">The buyer data is :: ");
    // console.log(BuyerData);
  }, [BuyerData]);
  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  We have emailed your order confirmation, and will send you an
                  update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button> */}
                  {activeStep === steps.length - 1 ? (
                    props.toPay ? (
                      <Paypal
                        toPay={props.toPay}
                        onSuccess={transactionSuccess}
                        transactionError={transactionError}
                        transactionCanceled={transactionCanceled}
                      />
                    ) : (
                      <p>Waiting payment server...</p>
                    )
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Nust
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
        {Success
          ? RenderResult(
              "success",
              "Congratulation your payment operation succeed"
            )
          : RenderResult(
              "error",
              "Oooops something went wrong please contact us and report your problem *_*"
            )}
      </main>
    </React.Fragment>
  );
}
