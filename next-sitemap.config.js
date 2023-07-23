/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://safefoods.com.bd",
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/checkout",
          "/account",
          "/account/edit-profile",
          "/account/details",
          "/cart",
          "/account/email-verification",
          "/account/forget-password",
          "/account/orders",
          "/account/otp-verification",
          "/account/reset-password",
          "/account/verify-account",
        ],
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  exclude: ["/checkout", "/account", "/cart"],
  // ...other options
};
