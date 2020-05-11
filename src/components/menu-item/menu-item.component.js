import React from "react";
import "./menu-item.styles.scss";
import { Link } from "react-router-dom";
function MenuItem({ title, imageUrl, size, id, linkUrl }) {
  console.log(linkUrl);
  return (
    <div className={`${size} menu-item`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <div className="content">
        <h1 className="title">
          {" "}
          <Link to={`${linkUrl}`}>{title.toUpperCase()}</Link>
        </h1>
        <span className="subtitle">
          {" "}
          <Link to={`${linkUrl}`}>SHOP NOW </Link>
        </span>
      </div>
    </div>
  );
}

export default MenuItem;
