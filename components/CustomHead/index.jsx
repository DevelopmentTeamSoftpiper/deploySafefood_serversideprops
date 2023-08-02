import Head from "next/head";
import React from "react";

const CustomHead = ({
  title,
  description = "Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption.",
  image = "https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png",
  url = "https://safefoods.com.bd",
}) => {
  return (
    <Head>
      <title> {title} </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/assets/images/logo-safefoods.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="og:title" property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta name="og:image" content={image} />
      <meta property="og:site_name" content="https://safefoods.com.bd" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:site" content="@sajibahmed5282" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        property="twitter:url"
        content="https://twitter.com/sajibahmed5282/"
      />
      <meta name="twitter:image" content={image} />

      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content="safefoods, safefood, safekhabar, foods, food, pure food, pure honey, modhu, dhaka safefoods, proteins safefoods, Safe egg,Safe Broiler, Desi Liquid Milk, Safe Omega safe honey, safe Chia Seed"
      />
    </Head>
  );
};

export default CustomHead;
