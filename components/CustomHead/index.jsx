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
      <meta charset="UTF-8" />
      <title> Safefoods | {title} </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/assets/images/logo-safefoods.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`Safefoods | ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="https://safefoods.com.bd" />
      <meta name="robots" content="index, follow" />
      {/* <link rel="canonical" href="https://safefoods.com.bd" /> */}
      {/* <meta http-equiv="refresh" content="5; url=https://safefoods.com.bd" /> */}
      <meta
        name="news_keywords"
        content={`Safefood, Food, online e commerce bd ,${title} `}
      />
      <meta name="google-site-verification" content="bbIuQ9huXa9pz-9j4O-oT2FietOhcTPvzHizWM8ji-s" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:site" content="@sajibahmed5282" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`Safefoods | ${title}`} />

      <meta name="twitter:description" content={description} />
      <meta
        property="twitter:url"
        content="https://twitter.com/sajibahmed5282/"
      />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default CustomHead;
