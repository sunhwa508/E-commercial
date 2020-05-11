export function addItemtoCart(cartItems, cartItemToAdd) {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.name === cartItemToAdd.name
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

export function removeFromCart(cartItems, cartItemToRemove) {
  const existionCartItem = cartItems.find(
    (cartItem) => cartItem.name === cartItemToRemove.name
  );

  if (existionCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.name != cartItemToRemove.name
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.name === cartItemToRemove.name
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

export function saveCart(cartItems) {
  window.localStorage.setItem("MyCART", JSON.stringify(cartItems));
}

export function setCart() {
  const myobj = localStorage.getItem("MyCART");
  return JSON.parse(myobj);
}

export function removeCart(cartItems) {
  window.localStorage.removeItem("MyCART", JSON.stringify(cartItems));
}
