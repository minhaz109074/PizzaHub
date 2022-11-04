import { Button } from "@mui/material";
import React, { Fragment } from "react";
import CartContext from "../../store/CartContext";
import { useContext } from "react";
import { useRouter } from "next/router";

function ConfirmOrder() {
  const cartCtx = useContext(CartContext);
  const router = useRouter();
  const confirmOrderHandler = async () => {
    const price = cartCtx.cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
    const response = await fetch(
      "https://pizzahub-d8c70-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          orderedItems: cartCtx.cartItems,
          user: { ...cartCtx.checkoutInfo },
          totalPrice: price,
        }),
      }
    );
    const data = await response.json();

    router.push(`/orders/${data.name}`);
  };
  return (
    <div className="confirm">
      <Button variant="contained" onClick={confirmOrderHandler}>
        Confirm your order
      </Button>
    </div>
  );
}

export default ConfirmOrder;
