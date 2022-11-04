import React, { useContext } from "react";
import Modal from "../UI/Modal";
import Image from "next/image";
import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import CustomButton from "../UI/CustomButton";
import Link from "next/link";
import CartContext from "../../store/CartContext";
import { useRouter } from "next/router";

function QuickView(props) {
  const cartStore = useContext(CartContext);
  const router = useRouter();
  const product = {
    id: props.itemId,
    slug: props.itemSlug,
    name: props.itemName,
    image: props.itemImage,
    price: props.itemPrice,
    inStock: props.itemStock,
  };
  const addToCartHandler = () => {
    const existingCartItem = cartStore.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existingCartItem ? existingCartItem.quantity + 1 : 1;
    if (product.inStock < quantity) {
      window.alert("Sorry, product is out of stock");
      return;
    }
    cartStore.addItem({ ...product, quantity });
    router.push("/Cart");
  };
  return (
    <Modal onClose={props.onHide}>
      <Box sx={{ marginTop: "2rem", backgroundColor: "#fefefe" }}>
        <Grid container spacing={1} sx={{ marginBottom: "1.5rem" }}>
          <Grid item md={6} xs={12}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={props.itemImage}
                  title={props.itemName}
                ></CardMedia>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md={5} xs={12}>
            <List sx={{ paddingTop: "1rem" }}>
              <ListItem>
                <Typography variant="h4" component="h1">
                  {props.itemName}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ fontWeight: "700" }}>
                  Price: ${props.itemPrice.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  sx={{
                    fontWeight: "700",
                    color: `${props.itemStock > 0 ? "green" : "red"}`,
                  }}
                >
                  {props.itemStock > 0 ? "In-stock" : "Out of stock"}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={props.onHide}>
            Close
          </Button>
          <Box>
            <Button
              variant="outlined"
              sx={{ marginRight: "0.5rem" }}
              onClick={props.onHide}
            >
              <Link href={`/products/${props.itemSlug}`}>Show Details</Link>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff7a1a",
                color: "#fff",
                "&:hover": { backgroundColor: "#ff8933" },
              }}
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default QuickView;
