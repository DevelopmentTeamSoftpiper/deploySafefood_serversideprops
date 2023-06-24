import Head from 'next/head'
import React from 'react'

const emailVerification = () => {
  return (
    <>
       <Head>
      <title>Safefoods|Verity Email</title>
      <meta name="description" content = "Safefoods: For Your Family"/>
      <link rel="icon" href="/assets/images/logo-safefoods.png" />
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