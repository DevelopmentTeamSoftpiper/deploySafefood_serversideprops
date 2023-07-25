import CustomHead from "@/components/CustomHead";
import Head from "next/head";
import React from "react";

const emailVerification = () => {
  return (
    <>
      <CustomHead
        title="Shop"
        url="https://safefoods.com.bd/email-verification"
      />
      <section className="entire-banner mt-5 pt-5">
        <h3 className="text-center">
          Welcome to Safefood! please verify your email.{" "}
        </h3>
        <h4 className="text-center mx-auto mb-3 px-5">
          Check your inbox for a verification link. Click the link to activate
          your account.
        </h4>
      </section>
    </>
  );
};

export default emailVerification;
