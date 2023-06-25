import Head from 'next/head'
import React from 'react'

const emailVerification = () => {
  return (
    <>
       <Head>
       <title>Safefoods | Email Verification</title>
  <meta name="description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <link rel="icon" href="/assets/images/logo-safefoods.png" />
  <meta property="og:url" content="https://safefoods.com.bd/account/email-verification"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="Safefoods | Email Verification"/>
  <meta property="og:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta property="og:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta property="twitter:domain" content="safefoods.com.bd"/>
  <meta property="twitter:url" content="https://safefoods.com.bd/account/email-verification"/>
  <meta name="twitter:title" content="Safefoods | Email Verification"/>
  <meta name="twitter:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta name="twitter:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>
    </Head>
    <section className="entire-banner mt-5 pt-5">
    <h3 className="text-center">Welcome to Safefood! please verify your email. </h3>
    <h4 className="text-center mx-auto mb-3 px-5">
    Check your inbox for a verification link. Click the link to activate your account.
    </h4>
    </section>
    </>

  )
}

export default emailVerification