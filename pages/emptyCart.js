import CustomHead from "@/components/CustomHead";
import React from "react";
import { BsFillCartXFill } from "react-icons/bs";

const emptyCart = () => {
  return (
    <>
      <CustomHead
        title="Empty Cart"
        url="https://safefoods.com.bd/account/emptyCart"
      />

      <main className="main">
        {/* End .breadcrumb-nav */}
        <div className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17">
          <div className="container">
            <div className="row d-flex flex-column justify-content-center align-items-center ">
              <BsFillCartXFill
                style={{
                  fontSize: "5rem",
                  color: "brown",
                  marginBottom: "3rem",
                }}
              />
              <h5>Cart is Empty.</h5>
              <h5 className="d-flex justify-center">
                {" "}
                Do some shopping first.
              </h5>
            </div>
          </div>
          {/* End .container */}
        </div>
        {/* End .login-page section-bg */}
      </main>
    </>
  );
};

export default emptyCart;
