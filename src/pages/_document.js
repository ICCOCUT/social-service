import { Html, Head, Main, NextScript } from "next/document";
import Header from "../pages/components/header"
import Footer from "../pages/components/Footer"
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Header />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
