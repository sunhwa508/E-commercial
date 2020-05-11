import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import "./header-style.scss";
import { auth } from "../../Firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon-component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { ReactComponent as Logo } from "../../assets/crown.svg";

export default function Header() {
  const { currentUser } = useContext(Context);

  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      <CartDropdown />
    </div>
  );
}
