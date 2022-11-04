import React from "react";
import CustomButton from "../UI/CustomButton";
import { Grid } from "@mui/material";
import { useState } from "react";
import CardItem from "./CardItem";

function ProductItem(props) {
  return (
    <Grid container spacing={3}>
      {props.items.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </Grid>
  );
}

export default ProductItem;
