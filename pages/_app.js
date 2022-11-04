import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { ThemeProvider } from "@mui/material";
import theme from "../components/UI/Theme";
import CssBaseline from "@mui/material/CssBaseline";
import CartProvider from "../store/CartProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </ThemeProvider>
  );
}

export default MyApp;
