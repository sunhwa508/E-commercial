import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "./Context";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header-component";
import CheckOut from "./pages/checkout/checkout";
import Contact from "./components/Contact/contact";

import { GlobalStyle } from "./global.styles";

export default function App() {
  const { currentUser } = useContext(Context);
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route exact path="/signin">
          {currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />}
        </Route>
        <Route exact path="/checkout">
          <CheckOut />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
      </Switch>
    </div>
  );
}
