import React, { useContext } from "react";
import { Context } from "../../Context";

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./Collection-item-style";

export default function CollectionItem({ id, name, price, imageUrl }) {
  const { addCartItems } = useContext(Context);

  return (
    <CollectionItemContainer>
      <BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />

      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        inverted
        onClick={() => addCartItems({ id, imageUrl, name, price })}
      >
        ADD TO CART
      </AddButton>
    </CollectionItemContainer>
  );
}
