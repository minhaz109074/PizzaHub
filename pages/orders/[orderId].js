import {
  Card,
  Grid,
  ListItem,
  Typography,
  List,
  Box,
  Modal,
  Button,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { useRouter } from "next/router";
import CartContext from "../../store/CartContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #e3e3e3",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

function OrderDetailPage() {
  const cartCtx = useContext(CartContext);
  const router = useRouter();
  const orderId = router.query.orderId;
  const [open, setOpen] = React.useState(false);

  const price = cartCtx.cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  const totalitems = cartCtx.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const userInfo = { ...cartCtx.checkoutInfo };
  const cartData = [...cartCtx.cartItems];

  const handleOpen = () => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  };
  const handleClose = () => {
    setOpen(false);
    cartCtx.clearCart();
    router.push("/orders");
  };
  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div className="orderDetail">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Button
            id="modal-modal-title"
            variant="contained"
            onClick={handleClose}
          >
            Go to My order Page
          </Button>
        </Box>
      </Modal>
      <Typography sx={{ marginBottom: "2rem", fontWeight: "700" }}>
        Congratulations! Your order has been successfully placed.
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Card>
            <Typography
              variant="h4"
              component="h1"
              sx={{ marginTop: "1rem", marginLeft: "0.5rem" }}
            >
              Order details
            </Typography>
            <List>
              <ListItem>OrderID: {orderId}</ListItem>
              <ListItem sx={{ fontSize: "1.4rem" }}>
                Shipping Information
              </ListItem>
              <ListItem>User Name: {userInfo.fullName}</ListItem>
              <ListItem>User email: {userInfo.email}</ListItem>
              <ListItem>User phone: {userInfo.phone}</ListItem>
              <ListItem>User address: {userInfo.address}</ListItem>
              <ListItem>User city: {userInfo.city}</ListItem>
              <ListItem>User postal code: {userInfo.postalcode}</ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                marginLeft: "0.5rem",
                marginBottom: "1rem",
                fontWeight: "500",
              }}
            >
              Order summary
            </Typography>
            {cartData.map((item, index) => (
              <ListItem key={index}>
                {item.name}: {item.quantity}
              </ListItem>
            ))}

            <ListItem>Total items: {totalitems}</ListItem>
            <ListItem>Total Amount: {price}$</ListItem>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderDetailPage;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const orderId = params.orderId;
//   const response = await fetch(
//     "https://pizzahub-d8c70-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
//   );

//   const data = await response.json();
//   const userData = [];
//   for (let key in data) {
//     if (key === orderId) {
//       userData.push({
//         price: data[key].totalPrice,
//         orderedItems: [...data[key].orderedItems],
//         fullName: data[key].user.fullName,
//         email: data[key].user.email,
//         phone: data[key].user.phone,
//         address: data[key].user.address,
//         city: data[key].user.city,
//         postalcode: data[key].user.postalcode,
//         id: key,
//       });
//     }
//   }
//   return {
//     props: {
//       userData,
//     },
//   };
// }
