import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import { auth } from "../../Firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon-component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
export default function Header() {
  const { currentUser } = useContext(Context);

  return (
    <HeaderContainer>
      <LogoContainer to="/" className="logo-container">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      <CartDropdown />
    </HeaderContainer>
  );
}
