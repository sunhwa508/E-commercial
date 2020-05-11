import React, { useContext } from "react";
import { Context } from "../../Context";
import "./checkout.scss";
function CheckoutItem({ cartItem }) {
  const { removeItem, addCartItems, removeFromCartItems } = useContext(Context);

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={cartItem.imageUrl} alt="item" />
      </div>
      <span className="name">{cartItem.name}</span>
      <div className="quantity">
        <div onClick={() => removeFromCartItems(cartItem)} className="arrow">
          &#10094;
        </div>
        <span className="value">{cartItem.quantity}</span>
        <div onClick={() => addCartItems(cartItem)} className="arrow">
          &#10095;
        </div>
      </div>
      <span className="price">{cartItem.price}</span>
      <div onClick={() => removeItem(cartItem.name)} className="remove-button">
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
