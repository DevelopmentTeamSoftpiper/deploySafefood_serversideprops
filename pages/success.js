import CustomHead from "@/components/CustomHead";
import SuccessProduct from "@/components/checkout/SuccessProduct";
import withAuth from "@/utils/restrict";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Success = () => {
  const user = useSelector((state) => state.user.currentUser);
  const jwt = useSelector((state) => state.user.jwt);
  const [order, setOrder] = useState(null);

  const geOrderInfo = async () => {
    const order = await axios.post(
      "/api/admin/order/findLatest",
      {
        user_id_no: user?._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${jwt}`,
        },
      }
    );

    setOrder(order);
  };
  useEffect(() => {
    geOrderInfo();
  }, [user]);

  if (!user) {
    router.push("/account/login");
    return null;
  }

  return (
    <>
      <CustomHead
        title="Order Summery"
        url="https://safefoods.com.bd/account/success"
      />

      <div className="page-wrapper p-5">
        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: 'url("assets/images/page-header-bg.jpg")',
            }}
          >
            <div className="container">
              <h1 className="page-title">Order Summery</h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}

          <div className="page-content mt-2">
            <div className="checkout">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 className="checkout-title">Billing Details</h2>
                    {/* End .checkout-title */}
                    <div className="row">
                      <div className="col-sm-6">
                        <label style={{ fontWeight: 600 }}> Name</label>
                        <p style={{ color: "black" }}>
                          {order?.data?.order?.name}
                        </p>
                      </div>
                      {/* End .col-sm-6 */}
                      <div className="col-sm-6">
                        <label style={{ fontWeight: 600 }}>Email</label>
                        <p style={{ color: "black" }}>
                          {order?.data?.order?.email}
                        </p>
                      </div>
                      {/* End .col-sm-6 */}
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <label style={{ fontWeight: 600 }}>Phone No</label>
                        <p style={{ color: "black" }}>
                          {order?.data?.order?.phone}
                        </p>
                      </div>
                      {/* End .col-sm-6 */}
                      <div className="col-sm-6">
                        <label style={{ fontWeight: 600 }}>
                          Street address{" "}
                        </label>
                        <p style={{ color: "black" }}>
                          {order?.data?.order?.address}
                        </p>
                      </div>
                      {/* End .col-sm-6 */}
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <label style={{ fontWeight: 600 }}>City </label>
                        <p style={{ color: "black" }}>
                          {order?.data?.order?.city}-
                          {order?.data?.order?.post_code}
                        </p>
                      </div>
                      {/* End .col-sm-6 */}
                      <div className="col-sm-6">
                        <label style={{ fontWeight: 600 }}>Country</label>
                        <p style={{ color: "black" }}>
                          {order?.data?.order?.country}
                        </p>
                      </div>
                      {/* End .col-sm-6 */}
                    </div>
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-6">
                    <div className="summary">
                      <h3 className="summary-title">Your Order</h3>
                      {/* End .summary-title */}
                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th></th>
                            <th></th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.data?.order?.products?.map((cartProduct) => (
                            <SuccessProduct
                              key={cartProduct?._id}
                              cartProduct={cartProduct}
                            />
                          ))}

                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td></td>
                            <td></td>
                            <td>{order?.data?.order?.subtotal} BDT</td>
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr>
                            <td>Shipping:</td>
                            <td></td>
                            <td></td>
                            <td>{order?.data?.order?.shipping_cost} BDT</td>
                          </tr>
                          <tr className="summary-total">
                            <td>Total:</td>
                            <td></td>
                            <td></td>
                            <td>{order?.data?.order?.total} BDT</td>
                          </tr>
                          {order?.data?.order?.afterDiscountTotal && (
                            <tr className="summary-total">
                              <td>After Discount Total </td>
                              <td></td>
                              <td></td>
                              <td>
                                {order?.data?.order?.afterDiscountTotal} BDT
                              </td>
                            </tr>
                          )}
                          {order?.data?.order?.coupon && (
                            <tr className="summary-total">
                              <td>Coupon Name :</td>
                              <td></td>
                              <td></td>
                              <td>{order?.data?.order?.coupon}</td>
                            </tr>
                          )}
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}

                      {/* End .accordion */}
                    </div>
                    {/* End .summary */}
                  </aside>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </div>
            {/* End .checkout */}
          </div>
          {/* End .page-content */}
        </main>
      </div>
    </>
  );
};

export default withAuth(Success);
