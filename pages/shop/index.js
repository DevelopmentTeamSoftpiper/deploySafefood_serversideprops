import React, { useEffect, useState } from "react";
import {  getData } from "@/utils/api";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Image from "next/image";
import Product from "@/models/Products";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/db";
import Head from "next/head";

const Shop = ({products,categories }) => {
  // const [categories, setCategories] = useState(null);


  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  // const fetchCategories = async () => {
  //   const {data} = await axios.get("/api/admin/category/getAll");
    
  //   setCategories(data);
  // };

  const showToastMsg =(data)=>{
    toast.success(data.msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
   
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return (
<>
<Head>
<title>Safefoods | Shop</title>
  <meta name="description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <link rel="icon" href="/assets/images/logo-safefoods.png" />
  <meta property="og:url" content="https://safefoods.com.bd/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="Safefoods | For Your Family"/>
  <meta property="og:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta property="og:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta property="twitter:domain" content="safefoods.com.bd"/>
  <meta property="twitter:url" content="https://safefoods.com.bd/"/>
  <meta name="twitter:title" content="Safefoods | For Your Family"/>
  <meta name="twitter:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta name="twitter:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>

    </Head>
<main className="main">
      <ToastContainer/>

    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          <span>Shop</span>
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/shop">Shop</Link>
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {/* End .toolbox */}
            <div className="products mb-3">
              <div className="row justify-content-center">
              {products?.map((product) => (
          <div key={product?._id} className="col-6 col-md-4 col-lg-4 col-xl-3">
            <ProductCard key={product?.id} data={product} showToastMsg={showToastMsg} />
          </div>
        ))}
        
       
              </div>
              {/* End .row */}
            </div>
     
          </div>
          {/* End .col-lg-9 */}
          <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
        
  
            <div className="col-lg-5cols d-none d-lg-block">
            <nav className="side-nav">
              <div className="sidenav-title letter-spacing-normal font-size-normal d-flex justify-content-xl-between align-items-center bg-primary justify-content-center text-truncate">
                Browse Categories
                <i className="icon-bars float-right h5 text-white m-0 d-none d-xl-block" />
              </div>
              {/* End .sidenav-title   font-size-normal */}
              <ul
                className="menu-vertical sf-arrows sf-js-enabled"
                style={{ touchAction: "pan-y" }}
              >
              {categories?.map((c) => (
                  <li key={c._id} className="megamenu-container">
                    <Link
                      className={
                        c?.subCategories?.length > 0
                          ? "sf-with-ul text-dark d-flex"
                          : "text-dark d-flex"
                      }
                      href={`/category/${c?.slug}`}
                    >
                      <Image
                        height={20}
                        width={20}
                        src={c?.image}
                        alt={c?.name}
                        priority={true}
                      />
                      {c?.name}
                    </Link>
                    {c?.subCategories?.length > 0 && (
                      <div className="megamenu">
                        <div className="row ">
                                <div className="col-md-12">
                                  <ul>
                                    {c?.subCategories?.map(
                                      (sub) => (
                                        <li key={sub?._id}>
                                          <Link
                                            href={`/subcategory/${sub?.slug}`}
                                          >
                                            {sub?.name}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

            </div>
            {/* End .sidebar sidebar-shop */}
          </aside>
          {/* End .col-lg-3 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

    </div>
    {/* End .page-content */}
  </main>
</>
  )
}

export default Shop



// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
  db.connectDb();
  const productsData = await Product.find({})
  .populate({path:"category", model:Category})
  .populate({path:"subCategory", model:SubCategory})
  .sort({ updatedAt: -1 })

  const catetgoriesData = await Category.find({}).populate({path:'subCategories',model: SubCategory}).sort({ updatedAt: -1 });
db.disconnectDb();
  return {
    props: {

      products: JSON.parse(JSON.stringify(productsData)),
      categories: JSON.parse(JSON.stringify(catetgoriesData)),
   
    },
    revalidate:60
  };
}
