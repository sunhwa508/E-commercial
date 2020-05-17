import React from "react";
import CollectionItem from "../Collection-item/Collection-item";
import { withRouter } from "react-router-dom";
import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer,
} from "./collection-preview-styles";

function CollectionPreview({ title, items, history, match, routeName }) {
  return (
    <CollectionPreviewContainer>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${routeName}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      <PreviewContainer>
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} {...item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
}
export default withRouter(CollectionPreview);
