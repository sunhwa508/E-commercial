import React from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";
import Collection from "../collection/collection";
import CollectionOverview from "../../components/collection-overview/collection-overview";

export default function ShopPage() {
  const { url } = useRouteMatch();
  console.log(url);
  return (
    <div className="shop-page">
      <Route exact path={`${url}`}>
        <CollectionOverview />
      </Route>
      <Route exact path={`${url}/:collectionId`}>
        <Collection />
      </Route>
    </div>
  );
}
