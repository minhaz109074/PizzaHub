import React from "react";
import { Button } from "@mui/material";
function CustomButton(props) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#ff7a1a",
        color: "#fff",
        "&:hover": { backgroundColor: "#ff8933" },
      }}
      onClick={props.onAddtoCart}
    >
      {props.children}
    </Button>
  );
}

export default CustomButton;
