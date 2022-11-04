import {
  Typography,
  Box,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import CartContext from "../store/CartContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

function CheckOut() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const cartCtx = useContext(CartContext);
  const router = useRouter();
  useEffect(() => {
    setValue("fullName", cartCtx.checkoutInfo.fullName);
    setValue("email", cartCtx.checkoutInfo.email);
    setValue("phone", cartCtx.checkoutInfo.phone);
    setValue("address", cartCtx.checkoutInfo.address);
    setValue("city", cartCtx.checkoutInfo.city);
    setValue("postalcode", cartCtx.checkoutInfo.postalcode);
  }, []);

  const submitHandler = ({
    fullName,
    email,
    phone,
    address,
    city,
    postalcode,
  }) => {
    cartCtx.saveCheckoutInfo({
      fullName,
      email,
      phone,
      address,
      city,
      postalcode,
    });
    router.push("/orders/confirmOrder");
  };

  return (
    <div className="checkout">
      {cartCtx.cartItems.length === 0 ? (
        <Typography
          variant="h5"
          component="h1"
          sx={{ marginTop: "4rem", textAlign: "center" }}
        >
          No items in the cart. Please add items to the cart
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography variant="h4" component="h1">
            Shipping Details
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === "minLength"
                          ? "Please enter a name with length greater than 1"
                          : "Full name is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="E-mail"
                    inputProps={{ type: "email" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "Please enter a valid email"
                          : "E-mail is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="Phone No."
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.phone)}
                    helperText={
                      errors.phone
                        ? errors.phone.type === "pattern"
                          ? "Please enter a valid  Phone no.(start with +8801..... / 01...)"
                          : "Phone no. is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === "minLength"
                          ? "Please enter a address with length greater than 1"
                          : "Address is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === "minLength"
                          ? "Please enter a city name with length greater than 1"
                          : "City is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="postalcode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 5,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="postalcode"
                    label="Postal Code"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.postalcode)}
                    helperText={
                      errors.postalcode
                        ? errors.postalcode.type === "minLength"
                          ? "Please enter valid postal code (5 characters)"
                          : "Postal code is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: "#ff7a1a",
                  color: "#1a1a1a",
                  "&:hover": { backgroundColor: "#ff8933" },
                }}
              >
                place order
              </Button>
            </ListItem>
          </List>
        </form>
      )}
    </div>
  );
}

export default CheckOut;
// export default dynamic(() => Promise.resolve(CheckOut), { ssr: false });
