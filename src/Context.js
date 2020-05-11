import React, { useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "./Firebase/firebase.utils";
import SHOP_DATA from "./pages/shop/shop.data";
import {
  addItemtoCart,
  removeFromCart,
  saveCart,
  removeCart,
} from "./components/cart-items/cart-utils";
const Context = React.createContext();

function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [AllItems, setAllItems] = useState(SHOP_DATA);
  const [total, setTotal] = useState();

  useEffect(() => {
    const myobj = JSON.parse(localStorage.getItem("MyCART"));
    console.log(myobj);
    setCartItems(myobj ? myobj : []);
  }, []);

  useEffect(() => {
    setTotal(
      cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
    );
  });

  function removeItem(name) {
    return setCartItems((prevItems) => {
      const items = prevItems.filter((item) => item.name !== name);
      saveCart(items);
      return items;
    });
  }
  function addCartItems(newitems) {
    cartItems.map((item) => saveCart(cartItems, item));
    return setCartItems(addItemtoCart(cartItems, newitems));
  }
  function removeFromCartItems(newitems) {
    const items = removeFromCart(cartItems, newitems);
    saveCart(items);
    return setCartItems(removeFromCart(cartItems, newitems));
  }

  function ToggleCart() {
    setHidden((prevState) => !prevState);
  }

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });

    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <Context.Provider
      value={{
        currentUser,
        ToggleCart,
        hidden,
        cartItems,
        addCartItems,
        total,
        setHidden,
        removeItem,
        removeFromCartItems,
        AllItems,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
