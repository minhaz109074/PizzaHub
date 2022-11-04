import styles from "./ProductList.module.css";
import DUMMY_Data from "../../data/dummy-data";
import React from "react";
import ProductItem from "./ProductItem";

function ProductList() {
  return (
    <section className={styles.products}>
      <h2 className={styles.productHead}>Choose your Pizza </h2>
      <ProductItem items={DUMMY_Data} />
    </section>
  );
}

export default ProductList;
