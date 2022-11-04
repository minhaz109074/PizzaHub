import React, { Fragment, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import NextLink from "next/link";
import CustomButton from "../UI/CustomButton";
import { useState } from "react";
import QuickView from "./QuickView";
import CartContext from "../../store/CartContext";

function CardItem(props) {
  // 'show quickview button'
  const [shown, setIsshown] = useState(false);
  //    'show modal'
  const [showQuickview, setShowQuickview] = useState(false);
  const [tempItemData, setTempItemData] = useState([]);

  const cartStore = useContext(CartContext);

  const showQuickviewHandler = (id, slug, name, image, price, inStock) => {
    let tempData = [id, slug, name, image, price, inStock];
    setTempItemData((data) => [...tempData]);
    return setShowQuickview(true);
  };
  const hideQuickviewHandler = () => {
    setShowQuickview(false);
  };

  const product = {
    id: props.id,
    slug: props.slug,
    name: props.name,
    image: props.image,
    price: props.price,
    inStock: props.inStock
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
  };
  return (
    <Fragment>
      <Grid item md={6} key={props.id}>
        <Card
          sx={{ backgroundColor: "#eeeeee", font: "Quicksand" }}
          onMouseEnter={() => setIsshown(true)}
          onMouseLeave={() => setIsshown(false)}
        >
          <CardActionArea>
            <NextLink href={`/products/${props.slug}`} passHref>
              <a>
                <CardMedia
                  component="img"
                  image={props.image}
                  title={props.name}
                ></CardMedia>
                <CardContent>
                  <Typography sx={{ fontWeight: "600" }}>
                    {props.name}
                  </Typography>
                </CardContent>
              </a>
            </NextLink>
          </CardActionArea>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography sx={{ fontWeight: "700", paddingLeft: "0.5rem" }}>
              ${props.price.toFixed(2)}
            </Typography>
            {shown && (
              <Button
                variant="outlined"
                sx={{ color: "#000", fontWeight: "600" }}
                onClick={() =>
                  showQuickviewHandler(
                    props.id,
                    props.slug,
                    props.name,
                    props.image,
                    props.price,
                    props.inStock
                  )
                }
              >
                Quickview
              </Button>
            )}
            <CustomButton onAddtoCart={addToCartHandler}>
              Add to cart
            </CustomButton>
          </CardActions>
        </Card>
      </Grid>
      {showQuickview && (
        <QuickView
          itemId={tempItemData[0]}
          itemSlug={tempItemData[1]}
          itemName={tempItemData[2]}
          itemImage={[tempItemData[3]]}
          itemPrice={tempItemData[4]}
          itemStock={tempItemData[5]}
          onHide={hideQuickviewHandler}
        />
      )}
    </Fragment>
  );
}

export default CardItem;
