/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/inline-script-id */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* GOOGLE SEARCH CONSOLE */}
        <meta
          name="google-site-verification"
          content="bbIuQ9huXa9pz-9j4O-oT2FietOhcTPvzHizWM8ji-s"
        />
        {/* End Google Tag Manager code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MJF6QPPM');
              `,
          }}
        />
        {/* End Google Tag Manager code */}
      </Head>

      <body>
        {/* Google Tag Manager noscript code */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJF6QPPM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager noscript code */}
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
