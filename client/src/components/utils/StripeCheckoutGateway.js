import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

function StripeCheckoutGateway(props) {
  const publickKey =
    "pk_test_51HQDo6Jnwa8diNXcvluzECoUbxXtFQcDwzBkJZlMD0kRl8X3G6ZzGaBBUSMjZSCvPGBQxTYbZlpWRqMmUi5A28VH00i2UdzWa9";

  let product = props.product;
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  return (
    <div>
      <StripeCheckout
        stripeKey={publickKey}
        token={handleToken}
        amount={props.total * 100}
        name={product.name}
        billingAddress
        shippingAddress
      />
    </div>
  );
}

export default StripeCheckoutGateway;
