/* eslint-disable */
import CartProduct from "@/components/checkout/CartProduct";
import { emptyCart } from "@/store/cartSlice";
import withAuth from "@/utils/restrict";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Loader from "@/components/Loader";
import Head from "next/head";
const checkout = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const jwt = useSelector((state) => state.user.jwt);
  const [applyCoupon, setApplyCoupon] = useState(null);
  const [existCoupon, setExistCoupon] = useState(null);


  const getUserInfo = async () => {
    setIsFetching(true);
    const userInfo = await axios.post(
      "/api/profile/find",
      {
        user_id_no: user._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${jwt}`,
        },
      }
    );

    setName(userInfo?.data?.name);
    setEmail(userInfo?.data?.email);
    setPhone(userInfo?.data?.phone);
    setAddress(userInfo?.data?.address);
    setPostalCode(userInfo?.data?.post_code);
    setCity(userInfo?.data?.city);
    setCountry(userInfo?.data?.country);
    setIsFetching(false);
  };

  const cartProducts = useSelector((state) => state.cart.cartItems);
  const subTotal = useMemo(() => {
    return cartProducts.reduce((total, val) => total + val.price, 0);
  }, [cartProducts]);

  const productData = cartProducts.map((p) => ({
    id: p?._id,
    title: p?.title,
    image: p?.image,
    quantityPrice: p?.oneQuantityPrice,
    quantity: p?.quantity,
    price: p?.price,
    category: p?.category?.name,
    subcategory: p?.subcategory?.name,
  }));

  const [shippings, setShippings] = useState(null);
  const [shippingCost, setShippingCost] = useState("70");

  const shippingCostChangeHandler = (e) => {
    setShippingCost(e.target.value);
  };

  const getShippings = async () => {
    const ships = await axios.get("/api/admin/shipping/getAll");
    setShippings(ships);
  };

  const [paymentMethods, setPaymentMethods] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const getPaymentMethods = async () => {
    const pMethods = await axios.get("/api/admin/payment-methods/getAll");

    setPaymentMethods(pMethods);
  };

  // COUPON DISCOUNT LOGIN START
  let total = parseInt(subTotal) + parseInt(shippingCost);
  let afterDiscountTotal = null;

  if (existCoupon) {
    if (existCoupon.discountType === "Taka") {
      afterDiscountTotal =
        parseInt(subTotal) +
        parseInt(shippingCost) -
        parseInt(existCoupon?.discount);
    } else if (existCoupon.discountType === "Percent") {
      const demoTotal = parseInt(subTotal) + parseInt(shippingCost);
      const discountValue = parseInt(existCoupon?.discount);
      const discountAmount = parseInt((discountValue / 100) * demoTotal);
      afterDiscountTotal =
        parseInt(subTotal) + parseInt(shippingCost) - discountAmount;
    }
  }
  // COUPON DISCOUNT LOGIN END

  useEffect(() => {
    getUserInfo();
    getShippings();
    getPaymentMethods();
  }, []);

  const [phoneNo, setPhoneNo] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const order = async () => {
    try {
      const response = await axios.post(
        "/api/admin/order/store",
        {
          products: productData,
          user_id_no: user._id,
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          post_code: postalCode,
          country: country ? country : "Bangladesh",
          shipping_cost: shippingCost,
          payment_method: paymentMethod,
          transaction_phone_no: phoneNo,
          transaction_id: transactionId,
          subtotal: subTotal,
          total: total,
          afterDiscountTotal,
          coupon: existCoupon?.coupon,
          status: "Not Processed",
          payment_status: "Not Verified",
          delivery_status: "Pending",
          isPaid: false,
          order_notes: orderNotes,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: `Bearer ${jwt}`,
          },
        }
      );
      dispatch(emptyCart());
      router.push("/success");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };
  const orderSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    order();
  };

  if (!user) {
    router.push("/account/login");
    return null;
  }
  useEffect(() => {
    if (cartProducts.length == 0) {
      router.push("/emptyCart");
      return null;
    }
  }, []);

  //COUPON HANDLE
  const handleCouponApply = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios(
        `/api/admin/coupon/find?coupon=${applyCoupon}`
      );
      if (data.status) {
        setExistCoupon(data.existCoupon);
        toast.success("Coupon Available", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setApplyCoupon("");
      } else {
        toast.error(`${data.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setExistCoupon(null);
      }
    } catch (error) {
      console.log("Coupon Error", error.message);
    }
  };

  return (
    <>
      <Head>
        <title> Safefoods | Checkout </title>
        <meta
          name="description"
          content="Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption."
        />
        <link rel="icon" href="/assets/images/logo-safefoods.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-wrapper p-5">
        <ToastContainer />

        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: 'url("assets/images/page-header-bg.jpg")',
            }}
          >
            <div className="container">
              <h1 className="page-title">
                Checkout<span>Shop</span>
              </h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="index.html">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="#">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </div>
            {/* End .container */}
          </nav>
          {/* End .breadcrumb-nav */}
          <div className="page-content">
            <div className="checkout">
              <div className="container">
                <form onSubmit={orderSubmitHandler}>
                  <div className="row">
                    <div className="col-lg-7">
                      <h2 className="checkout-title">Billing Details</h2>
                      {/* End .checkout-title */}
                      {isFetching && <Loader />}
                      {!isFetching && (
                        <div>
                          <div className="row">
                            <div className="col-sm-6">
                              <label>
                                Name <span style={{ color: "red" }}>*</span>{" "}
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                required={true}
                                value={name}
                                onChange={(e) => {
                                  return setName(e.target.value);
                                }}
                              />
                            </div>

                            <div className="col-sm-6">
                              <label>Email </label>
                              <input
                                type="email"
                                name="email"
                                className="form-control"
                                // required={true}
                                value={email}
                                onChange={(e) => {
                                  return setEmail(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <label>
                                Phone No <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="phone"
                                className="form-control"
                                required={true}
                                value={phone}
                                onChange={(e) => {
                                  return setPhone(e.target.value);
                                }}
                              />
                            </div>

                            <div className="col-sm-6">
                              <label>
                                Flat No, House No, Road No{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="address"
                                className="form-control"
                                required={true}
                                value={address}
                                onChange={(e) => {
                                  return setAddress(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <label>Postal Code </label>
                              <input
                                type="text"
                                name="post_code"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => {
                                  return setPostalCode(e.target.value);
                                }}
                              />
                            </div>

                            <div className="col-sm-6">
                              <label>
                                District <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="city"
                                className="form-control"
                                required={true}
                                value={city}
                                onChange={(e) => {
                                  return setCity(e.target.value);
                                }}
                              />
                            </div>

                            <div className="col-sm-6">
                              <label>
                                Country <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="country"
                                className="form-control"
                                required=""
                                value={country ? country : "Bangladesh"}
                                onChange={(e) => {
                                  return setCountry(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <label>Order notes (optional)</label>
                      <textarea
                        className="form-control"
                        cols={30}
                        rows={4}
                        placeholder="Notes about your order, e.g. special notes for delivery"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                      />
                    </div>
                    <aside className="col-lg-5">
                      <div className="summary">
                        <h3 className="summary-title">Your Order</h3>
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
                            {cartProducts?.map((cartProduct) => (
                              <CartProduct
                                key={cartProduct?._id}
                                cartProduct={cartProduct}
                              />
                            ))}

                            <tr className="summary-subtotal">
                              <td>Subtotal:</td>
                              <td></td>
                              <td></td>
                              <td>${subTotal}</td>
                            </tr>

                            <tr className="summary-shipping">
                              <td>Shipping:</td>
                              <td>&nbsp;</td>
                            </tr>

                            {/* End .summary-subtotal */}
                            {shippings?.data?.shippings?.map((ship) => (
                              <tr
                                key={ship?._id}
                                className="summary-shipping-row"
                              >
                                <td>
                                  <div className="form-check ">
                                    <label className="form-check-label">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        name="shippingMethod"
                                        value={ship?.cost}
                                        style={{
                                          marginTop: ".6rem",
                                          marginLeft: "-2rem",
                                        }}
                                        onChange={shippingCostChangeHandler}
                                        checked={ship?.cost == shippingCost}
                                      />
                                      {ship?.name}
                                    </label>
                                  </div>
                                  {/* End .custom-control */}
                                </td>
                                <td>BDT {ship?.cost}</td>
                              </tr>
                            ))}

                            <tr className="summary-total">
                              <td>Total:</td>
                              <td></td>
                              <td></td>
                              <td>BDT {total}</td>
                            </tr>
                            {existCoupon && (
                              <tr className="summary-total">
                                <td>Discount </td>
                                <td></td>
                                <td></td>
                                <td>
                                  {existCoupon.discountType === "Taka"
                                    ? `BDT : ${existCoupon.discount}`
                                    : `${existCoupon.discount} %`}
                                </td>
                              </tr>
                            )}
                            {existCoupon && (
                              <tr className="summary-total">
                                <td>After Discount Total :</td>
                                <td></td>
                                <td></td>
                                <td>BDT {afterDiscountTotal}</td>
                              </tr>
                            )}

                            {/* End .summary-total */}
                          </tbody>
                        </table>

                        {/* COUPON ADDED */}
                        <div className="row mb-2 ">
                          <div className="col-12  rounded-md shadow-2xl">
                            <div className="flex items-center gap-1 justify-center ">
                              <input
                                type="text"
                                name="coupon"
                                value={applyCoupon}
                                className="w-full focus:outline-[#61AB00]  rounded py-[8px] text-center"
                                placeholder="Enter Your Coupon Code"
                                onChange={(e) => setApplyCoupon(e.target.value)}
                              />
                              {applyCoupon && (
                                <button
                                  onClick={handleCouponApply}
                                  className="border px-2 py-[8px] bg-primary text-white rounded"
                                >
                                  Apply
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* COUPON END */}

                        <tr className="summary-shipping">
                          <td style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                            Payment Method:
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                        {paymentMethods?.data?.paymentMethods?.map((method) => (
                          <tr
                            key={method?._id}
                            className="summary-shipping-row"
                          >
                            <td>
                              <div className="form-check ">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="paymentMethod"
                                    value={method?.name}
                                    style={{
                                      marginTop: ".6rem",
                                      marginLeft: "-2rem",
                                    }}
                                    onChange={(e) => {
                                      setPaymentMethod(e.target.value);
                                    }}
                                    checked={method?.name == paymentMethod}
                                  />
                                  <p>{method?.name} </p>
                                  <p
                                    style={{ color: "black", fontWeight: 600 }}
                                  >
                                    {method?.description}
                                  </p>
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                          </tr>
                        ))}
                        {(paymentMethod === "Bkash" ||
                          paymentMethod === "Rocket" ||
                          paymentMethod === "Nagad") && (
                          <div className="row">
                            <div className="col-md-6">
                              <input
                                type="text"
                                placeholder="Mobile No"
                                className="form-control"
                                name="phonNo"
                                value={phoneNo}
                                onChange={(e) => {
                                  setPhoneNo(e.target.value);
                                }}
                                style={{
                                  marginTop: ".6rem",
                                  marginLeft: "-2rem",
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                placeholder="Transaction Id"
                                className="form-control"
                                name="transactionId"
                                value={transactionId}
                                onChange={(e) => {
                                  setTransactionId(e.target.value);
                                }}
                                style={{
                                  marginTop: ".6rem",
                                  marginLeft: "-2rem",
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {isLoading && <Loader />}

                        {/* End .accordion */}
                        <button
                          className="btn btn-outline-primary-2 btn-order btn-block mt-2"
                          type="submit"
                        >
                          <span className="btn-text">Place Order</span>
                          <span className="btn-hover-text">
                            Proceed to Checkout
                          </span>
                        </button>
                      </div>

                      {/* End .summary */}
                    </aside>
                    {/* End .col-lg-3 */}
                  </div>
                </form>
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

export default withAuth(checkout);
