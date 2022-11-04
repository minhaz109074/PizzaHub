import { useReducer } from "react";
import Cookies from "js-cookie";
import CartContext from "./CartContext";

const initialCartState = {
  items: Cookies.get("items") ? JSON.parse(Cookies.get("items")) : [],
  checkoutInfo: Cookies.get("checkoutInfo")
    ? JSON.parse(Cookies.get("checkoutInfo"))
    : {},
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.slug === action.item.slug
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...action.item,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    Cookies.set("items", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    const updatedItems = state.items.filter(
      (item) => item.slug !== action.item.slug
    );
    Cookies.set("items", JSON.stringify(updatedItems));
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "CHECKOUT_INFO") {
    Cookies.set("checkoutInfo", JSON.stringify(action.data));
    return {
      ...state,
      checkoutInfo: { ...action.data },
    };
  }
  if (action.type === "CHECKOUT_INFO") {
    Cookies.set("checkoutInfo", JSON.stringify(action.data));
    return {
      ...state,
      checkoutInfo: { ...action.data },
    };
  }
  if (action.type === "CLEAR_CART") {
    Cookies.set("items", []);
    Cookies.remove("checkoutInfo");
    return initialCartState;
  }

  return initialCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({ type: "REMOVE", item: item });
  };
  const saveCheckOutInfoHandler = (data) => {
    dispatchCartAction({ type: "CHECKOUT_INFO", data: data });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContext = {
    cartItems: cartState.items,
    checkoutInfo: cartState.checkoutInfo,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    saveCheckoutInfo: saveCheckOutInfoHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
