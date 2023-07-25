/* eslint-disable @next/next/inline-script-id */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="..//assets/js/jquery.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/jquery.hoverIntent.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/jquery.waypoints.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/superfish.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/bootstrap-input-spinner.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/jquery.plugin.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/jquery.countdown.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/jquery.magnific-popup.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="assets/js/owl.carousel.min.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
