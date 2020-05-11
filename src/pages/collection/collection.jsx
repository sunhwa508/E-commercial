import React, { useContext } from "react";
import "./collection.scss";
import { Context } from "../../Context";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/Collection-item/Collection-item";
export default function Collection() {
  const { collectionId } = useParams();
  const { AllItems } = useContext(Context);

  const Collections = AllItems.find(
    (collection) =>
      collectionId.toUpperCase() === collection.title.toUpperCase()
  );

  const { title, items } = Collections;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
