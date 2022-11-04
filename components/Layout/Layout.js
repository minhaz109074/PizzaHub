import React, { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import Head from "next/head";

function Layout(props) {
  return (
    <Fragment>
      <Head>
        <title>PizzaHub</title>
      </Head>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
