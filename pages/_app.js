import "@/styles/globals.css";
import Script from "next/script";
import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css/plugins/jquery.countdown.css";
import "../public/assets/css/plugins/magnific-popup/magnific-popup.css";
import "../public/assets/css/style.css";
import "../public/assets/css/skins/skin-demo-26.css";
import "../public/assets/css/demos/demo-26.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}
