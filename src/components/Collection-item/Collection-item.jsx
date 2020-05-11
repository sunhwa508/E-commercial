import React, { useContext } from "react";
import CustomButton from "../custom-button/custom-button";
import "./Collection-item.style.scss";
import { Context } from "../../Context";

export default function CollectionItem({ id, name, price, imageUrl }) {
  const { addCartItems } = useContext(Context);

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }}>
        {" "}
      </div>
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        inverted
        onClick={() => addCartItems({ id, imageUrl, name, price })}
      >
        ADD TO CART
      </CustomButton>
    </div>
  );
}
