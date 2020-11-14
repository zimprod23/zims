import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  removeFromCart,
  //onSuccesBy,
} from "../../../actions/authAction";
import UserCartBlock from "./UserCarteBlock";
//import Paypal from "../../utils/Paypal";
import Empty from "./Empty.PNG";
import "./success.PNG";
//import StripeCheckout from "../../utils/StripeCheckoutGateway";
import { Button } from "@material-ui/core";
import { TgState } from "./ToogleState";
import OpenDialog from "./Checkout/OpenDialog";
import { addToCart } from "../../../actions/authAction";

// function Success() {}
// function Faild() {}
function Mty() {
  return (
    <div
      style={{
        //width: "100%",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <br />
      <img src={Empty} />
    </div>
  );
}

function CartePage(props) {
  const dispatch = useDispatch();
  const CardData = useSelector((state) => state.auth.cartDetail);
  const auth = useSelector((state) => state.auth);
  const [CardDetailsEo, setCardDetailsEo] = useState(null);
  const [Total, setTotal] = useState(0);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [ShowTotal, setShowTotal] = useState(false);
  const RedirectToCheckout = () => {
    window.location.replace(`/checkout?papa=mama`);
  };
  useEffect(() => {
    let cartItems = [];
    if (props.user && props.user.user && props.user.user.cart) {
      if (props.user.user.cart.length > 0) {
        props.user.user.cart.forEach((element, i) => {
          cartItems.push(element.id);
        });
        dispatch(getCartItems(cartItems, props.user.user.cart))
          .then((response) => {
            if (CardData && CardData.length > 0) {
              calculateTotal(CardData);
            }
          })
          .catch((err) => {
            alert("Could not show  total");
          });
      }
    }
  }, [props.user, auth.user && auth.user.user]);
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const handleOpenDialog = () => {
    setToogle(true);
  };
  useEffect(() => {
    const wholsome = () => {
      setTotal(0);
      setCardDetailsEo(null);
    };
    const wholesomeSu = () => {
      setCardDetailsEo(CardData);
      calculateTotal(CardData);
    };
    CardData && CardData.length > 0 ? wholesomeSu() : wholsome();
  }, [CardData, Total]);

  const RemoveButton = (id) => {
    dispatch(removeFromCart(id)).then((res) => {
      if (CardData && CardData.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(CardDetailsEo);
      }
    });
  };

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  // const transactionSuccess = (data) => {
  //   dispatch(
  //     onSuccesBy({
  //       cartDetail: CardData,
  //       paymentData: data,
  //     })
  //   )
  //     .then((response) => {
  //       setShowSuccess(true);
  //       setShowTotal(false);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  // const transactionError = () => {
  //   console.log("Paypal error");
  // };

  // const transactionCanceled = () => {
  //   console.log("Transaction canceled");
  // };
  const incrementQ = (id) => {
    dispatch(addToCart(id))
      .then((res) => console.log("We havin good time outta here"))
      .catch((err) => console.log("We are shit"));
    console.log(id);
  };
  const decrementQ = (productId) => {
    dispatch(addToCart(productId, "minus"))
      .then((res) => console.log("We havin good time outta here"))
      .catch((err) => window.location.replace("/signin"));
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Carte</h1>
      <UserCartBlock
        products={CardDetailsEo}
        removeItem={RemoveButton}
        incrementQ={incrementQ}
        decrementQ={decrementQ}
      />
      {ShowTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>Total amount: ${Total} </h2>
        </div>
      ) : (
        <Mty />
      )}
      {ShowTotal && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          style={{ padding: "10px" }}
        >
          Continue payment (PayPal)
        </Button>
      )}
      {ShowTotal && <OpenDialog toPay={Total} products={CardDetailsEo} />}
    </div>
  );
}

export default CartePage;
