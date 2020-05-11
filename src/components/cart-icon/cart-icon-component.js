import React, { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { Context } from "../../Context";

export default function CartIcon() {
  const { ToggleCart, cartItems } = useContext(Context);
  return (
    <div className="cart-icon" onClick={ToggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItems.length}</span>
    </div>
  );
}
