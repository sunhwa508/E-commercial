import React from "react";

import { Link } from "react-router-dom";

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle,
} from "./menu-item-styles";

function MenuItem({ title, imageUrl, size, id, linkUrl }) {
  return (
    <MenuItemContainer className={`${size} menu-item`}>
      <BackgroundImageContainer
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <ContentContainer className="content">
        <ContentTitle className="title">
          {" "}
          <Link to={`${linkUrl}`}>{title.toUpperCase()}</Link>
        </ContentTitle>
        <ContentSubtitle className="subtitle">
          {" "}
          <Link to={`${linkUrl}`}>SHOP NOW </Link>
        </ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
}

export default MenuItem;
