import React, { useContext } from "react";
import { Context } from "../../Context";
import CollectionPreview from "../preview-collection.component/Collection.preview.componenet";
import { CollectionsOverviewContainer } from "./collection-overview.styles";

export default function CollectionOverview() {
  const { AllItems } = useContext(Context);
  return (
    <CollectionsOverviewContainer>
      {AllItems.map(({ id, ...othercollections }) => (
        <CollectionPreview key={id} {...othercollections} />
      ))}
    </CollectionsOverviewContainer>
  );
}
