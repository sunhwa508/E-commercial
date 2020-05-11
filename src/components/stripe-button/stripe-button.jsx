import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripeCheckoutButton({ price }) {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_Fpq4YJFbe8Dq3Yat75ySuLnW00EcKV4LKW";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="AMAZON Ltd"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amout={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}
