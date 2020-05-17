import React, { useContext } from "react";
import { Context } from "../../Context";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/Collection-item/Collection-item";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection-styles";

export default function Collection() {
  const { collectionId } = useParams();
  const { AllItems } = useContext(Context);

  const Collections = AllItems.find(
    (collection) =>
      collectionId.toUpperCase() === collection.title.toUpperCase()
  );

  const { title, items } = Collections;

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map((item) => (
          <CollectionItem key={item.name} {...item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
}
