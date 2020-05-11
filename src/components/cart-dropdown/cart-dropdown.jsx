import React, { useContext } from "react";
import CustomButton from "../custom-button/custom-button";
import "./cart-dropdown.scss";
import { Link } from "react-router-dom";
import { Context } from "../../Context";

export default function CartDropdown() {
  const { hidden, cartItems, ToggleCart } = useContext(Context);
  const items = cartItems.map((item) => (
    <div className="cart-item">
      <img src={item.imageUrl} />
      <div className="item-details">
        <span className="name">{item.name}</span>
        <span>
          💰{item.price} X {item.quantity}
        </span>
      </div>
    </div>
  ));

  return (
    <div
      className="cart-dropdown"
      style={{ display: hidden ? "block" : "none" }}
    >
      <div className="cart-items">{items}</div>
      <Link to="/checkout">
        <CustomButton onClick={() => ToggleCart()}>GO TO CHECKOUT</CustomButton>
      </Link>
    </div>
  );
}
