/*eslint-disable */
import CartItem from "@/components/product/CartItem";
import { fetchDataFromApi } from "@/utils/api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const cart = () => {
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const [shippings, setShippings] = useState(null);
  const [shippingCost, setShippingCost] = useState(70);

  const subTotal = useMemo(() => {
    return cartProducts.reduce((total, val) => total + val.price, 0);
  }, [cartProducts]);
  const getShippings = async () => {
    const ships = await fetchDataFromApi("/api/shippings?populate=*");
    setShippings(ships);
  };
  useEffect(() => {
    getShippings();
  }, []);

  const total = parseInt(subTotal) + parseInt(shippingCost);


  return (
 <>
    <Head>
    <title>Safefoods | Cart</title>
  <meta name="description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <link rel="icon" href="/assets/images/logo-safefoods.png" />
  <meta property="og:url" content="https://safefoods.com.bd/cart"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="Safefoods | Checkout"/>
  <meta property="og:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta property="og:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta property="twitter:domain" content="safefoods.com.bd"/>
  <meta property="twitter:url" content="https://safefoods.com.bd/cart"/>
  <meta name="twitter:title" content="Safefoods | For Your Family"/>
  <meta name="twitter:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta name="twitter:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>

    </Head>
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            Shopping Cart<span>Shop</span>
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
              Shopping Cart
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content p-5">
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <table className="table table-cart table-mobile" >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                  {cartProducts.length>0 ? cartProducts?.map((cartProduct) => (
                      <CartItem
                        key={cartProduct?._id}
                        cartProduct={cartProduct}
                      />
                    )): 
                    <h3>Nothing in the Cart.</h3>
                    }
                  </tbody>
                </table>
                {/* End .table table-wishlist */}
                {/* <div className="cart-bottom">
                  <div className="cart-discount">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="coupon code"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary-2"
                            type="submit"
                          >
                            <i className="icon-long-arrow-right" />
                          </button>
                        </div>
            
                      </div>
               
                    </form>
                  </div>
          
                  <a href="#" className="btn btn-outline-dark-2">
                    <span>UPDATE CART</span>
                    <i className="icon-refresh" />
                  </a>
                </div> */}
         
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-3">
                <div className="summary summary-cart">
                  <h3 className="summary-title">Cart Total</h3>
                  {/* End .summary-title */}
                  <table className="table table-summary">
                    <tbody>
                      <tr className="summary-subtotal">
                        <td>Subtotal:</td>
                        <td>${subTotal}</td>
                      </tr>
                      {/* End .summary-subtotal */}
              
                     

                      {/* End .summary-shipping-row */}

                      {/* <tr className="summary-shipping-estimate">
                        <td>
                  
                          <br /> <a href="dashboard.html">Change address</a>
                        </td>
                        <td>&nbsp;</td>
                      </tr> */}
                      {/* End .summary-shipping-estimate */}
              
                      {/* End .summary-total */}
                    </tbody>
                  </table>
                  {/* End .table table-summary */}
                  <Link
                    href={cartProducts.length > 0 ? "/checkout": "/shop"}
                    className="btn btn-outline-primary-2 btn-order btn-block"
                  >
                    {cartProducts.length > 0 ? "PROCEED TO CHECKOUT" : "CONTINUE SHOPPING"}
                  </Link>
                </div>
                {/* End .summary */}
                <Link
                  href="/"
                  className="btn btn-outline-dark-2 btn-block mb-3"
                >
                  <span>CONTINUE SHOPPING</span>
                  <i className="icon-refresh" />
                </Link>
              </aside>
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .cart */}
      </div>
      {/* End .page-content */}
    </main>
 </>
  );
};

export default cart;
