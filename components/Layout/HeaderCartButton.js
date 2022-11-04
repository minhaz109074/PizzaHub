import styles from "./HeaderCartButton.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import CartContext from "../../store/CartContext";
import { useContext, useEffect, useState } from "react";
function HeaderCartButton(props) {
  const cartStore = useContext(CartContext);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cartStore.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cartStore.cartItems]);
  return (
    <Link href="/Cart">
      <a>
        <button className={styles.button}>
          <span className={styles.icon}>
            <ShoppingCartOutlinedIcon />
          </span>
          <span className={styles.yourCart}>Your Cart</span>
          <span className={styles.badge}>{cartItemsCount}</span>
        </button>
      </a>
    </Link>
  );
}
export default HeaderCartButton;
