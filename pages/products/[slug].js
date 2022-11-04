import React from "react";
import { useRouter } from "next/router";
import DUMMY_Data from "../../data/dummy-data";
import Image from "next/image";
import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@mui/material";
import CustomButton from "../../components/UI/CustomButton";
import CartContext from "../../store/CartContext";
import { useContext } from "react";
import Link from "next/link";

function ProductDetailPage({ product }) {
  // const router = useRouter();
  const routerCart = useRouter();
  const cartStore = useContext(CartContext);
  // const prdouctSlug = router.query.slug;
  // const product = DUMMY_Data.find((item) => item.slug === prdouctSlug);

  if (!product) {
    return <p>Product not found.</p>;
  }
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
    routerCart.push("/Cart");
  };

  return (
    <Box sx={{ marginTop: "3rem", backgroundColor: "#fefefe" }}>
      <Grid container spacing={-2}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={480}
            height={320}
            layout="responsive"
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <List sx={{ paddingTop: "1rem" }}>
            <ListItem>
              <Typography
                variant="h2"
                component="h1"
                sx={{ marginBottom: "0.5rem" }}
              >
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography sx={{ marginBottom: "1rem", lineHeight: "1.7" }}>
                {product.description}
              </Typography>
            </ListItem>
            <ListItem>
              <Card sx={{ width: "100%", backgroundColor: "#eeeeee" }}>
                <List>
                  <ListItem>
                    <Grid container spacing={6}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontWeight: "700" }}>
                          Price
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ fontWeight: "700" }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={6}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontWeight: "700" }}>
                          Status
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            fontWeight: "700",
                            color: `${product.inStock > 0 ? "green" : "red"}`,
                          }}
                        >
                          {product.inStock > 0 ? "In-stock" : "Not available"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      onClick={addToCartHandler}
                      sx={{
                        backgroundColor: "#ff7a1a",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#ff8933" },
                      }}
                    >
                      Add to cart
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetailPage;

export async function getStaticProps(context) {
  const productSlug = context.params.slug;
  const product = DUMMY_Data.find((item) => item.slug === productSlug);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = DUMMY_Data.map((item) => ({ params: { slug: item.slug } }));

  return {
    paths: paths,
    fallback: false,
  };
}
