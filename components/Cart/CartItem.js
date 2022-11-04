import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { Fragment } from "react";
import CartContext from "../../store/CartContext";
import { useContext } from "react";
import Nextlink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

function CartItem() {
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const updateCartHandler = (item, qty) => {
    const quantity = +qty;
    cartCtx.addItem({ ...item, quantity });
  };
  const removeItemHandler = (item) => {
    cartCtx.removeItem(item);
  };
  const checkOutHandler = () => {
    router.push("/CheckOut");
  };

  return (
    <Fragment>
      <Typography
        variant="h4"
        component="h1"
        sx={{ marginLeft: "1rem", marginBottom: "1rem" }}
      >
        Your Cart
      </Typography>
      <Grid container spacing={5}>
        <Grid item md={9} xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartCtx.cartItems.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Card sx={{ width: "80%" }}>
                        <CardActionArea
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Nextlink href={`/products/${item.slug}`} passHref>
                            <a>
                              <CardMedia
                                component="img"
                                image={item.image}
                                title={item.name}
                                sx={{ width: "6rem", height: "4rem" }}
                              ></CardMedia>
                            </a>
                          </Nextlink>
                        </CardActionArea>
                      </Card>
                    </TableCell>
                    <TableCell>
                      <Nextlink href={`/products/${item.slug}`} passHref>
                        <Link
                          sx={{
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          <Typography>{item.name}</Typography>
                        </Link>
                      </Nextlink>
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        value={item.quantity}
                        onChange={(event) =>
                          updateCartHandler(item, event.target.value)
                        }
                      >
                        {[...Array(item.inStock).keys()].map((val) => (
                          <MenuItem key={val + 1} value={val + 1}>
                            {val + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: "1rem" }}>
                      ${item.price}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#878B90",
                          borderColor: "#e3e3e3",
                          "&:hover": { color: "#575C62" },
                        }}
                        onClick={() => removeItemHandler(item)}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card sx={{ marginTop: "10%", marginRight: "5%" }}>
            <List>
              <ListItem>
                <Typography variant="h6">
                  Total Items:{" "}
                  {cartCtx.cartItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6">
                  Total Amount: $
                  {cartCtx.cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff7a1a",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#ff8933" },
                  }}
                  onClick={checkOutHandler}
                >
                  Order now
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default dynamic(() => Promise.resolve(CartItem), { ssr: false });
