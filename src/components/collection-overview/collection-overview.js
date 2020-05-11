import React, { useContext } from "react";
import { Context } from "../../Context";
import "./collection-overview.scss";
import CollectionPreview from "../preview-collection.component/Collection.preview.componenet";

export default function CollectionOverview() {
  const { AllItems } = useContext(Context);
  return (
    <div className="collections-overview">
      {AllItems.map(({ id, ...othercollections }) => (
        <CollectionPreview key={id} {...othercollections} />
      ))}
    </div>
  );
}
