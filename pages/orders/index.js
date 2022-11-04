import {
  Button,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Orders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDataHandler = async () => {
      fetch(
        "https://pizzahub-d8c70-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const loadedData = [];
          for (let key in data) {
            loadedData.push({
              price: data[key].totalPrice,
              orderedItems: data[key].orderedItems
                ? data[key].orderedItems
                : [],
              id: key,
            });
          }
          setData(loadedData);
          console.log(loadedData);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchDataHandler();
  }, []);
  if (loading) return <div>Loading....</div>;

  return (
    <div className="orders">
      <Typography variant="h4" component="h1">
        Your orders
      </Typography>
      <Grid container>
        <Grid item md={9} xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "600" }}>
                    Order ID
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "600", paddingRight: "2rem" }}
                  >
                    Total Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600" }}>
                    Order Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell align="center" sx={{ fontSize: "1rem" }}>
                          {order.id}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            paddingRight: "3rem",
                            marginRight: "4rem",
                            fontSize: "1rem",
                          }}
                        >
                          {order.price}$
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "1rem" }}>
                          {order.orderedItems.map((item, index) => (
                            <List key={index}>
                              <ListItem sx={{ marginLeft: "1rem" }}>
                                {item.name}: {item.quantity} ({item.price}$)
                              </ListItem>
                            </List>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Orders;
