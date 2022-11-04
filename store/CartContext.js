import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  checkoutInfo: {},
  addItem: (item) => {},
  removeItem: (item) => {},
  saveCheckoutInfo: (data) => {},
  clearCart: () => {},
});

export default CartContext;
