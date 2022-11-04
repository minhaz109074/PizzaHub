import { Card, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import NextLink from "next/link";
import CartItem from "../components/Cart/CartItem";
import dynamic from "next/dynamic";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  return (
    <Card sx={{ margin: "2rem 3%" }}>
      {cartCtx.cartItems.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: "600" }}>
            Your Cart is empty.
          </Typography>
          <NextLink href="/" passHref>
            <Link>Start Shopping</Link>
          </NextLink>
        </Box>
      ) : (
        <CartItem />
      )}
    </Card>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
