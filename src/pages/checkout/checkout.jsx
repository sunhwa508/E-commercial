import React, { useContext } from "react";
import { Context } from "../../Context";
import "./checkout.scss";
import StriptCheckoutButton from "../../components/stripe-button/stripe-button";
import CheckoutItem from "../../components/checkout-item/check-out";
export default function CartItem() {
  const { cartItems, total, hidden } = useContext(Context);

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.name} cartItem={cartItem} />
      ))}

      <div className="total">💎 {total}</div>
      <div className="test-warning">
        💢Please use the following text credit card for payments <br />
        4242 4242 4242 4242 -Exp: 01/22 -CVV: 123 💦
      </div>
      <StriptCheckoutButton price={total} />
    </div>
  );
}
