import { Fragment } from "react";
import React from "react";
import Link from "next/link";
import styles from "./MainNavigation.module.css";
import HeaderCartButton from "./HeaderCartButton";

function MainNavigation(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.homeLink}>
          <Link href="/">
            <a>
              <h1>PizzaHub</h1>
            </a>
          </Link>
        </div>
        <div className={styles.order}>
          <Link href="/orders">My Orders</Link>
        </div>
        <HeaderCartButton />
      </header>
    </Fragment>
  );
}

export default MainNavigation;
