/* eslint-disable @next/next/inline-script-id */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="bbIuQ9huXa9pz-9j4O-oT2FietOhcTPvzHizWM8ji-s"
        />
        <meta property="og:title" content="Safefoods | For Your Family" />
        <meta property="og:url" content="https://www.safefoods.com.bd/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"
        />
        <meta property="og:site_name" content="https://safefoods.com.bd" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZVGWSF31ZS"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-ZVGWSF31ZS');

          `}
        </Script>

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
