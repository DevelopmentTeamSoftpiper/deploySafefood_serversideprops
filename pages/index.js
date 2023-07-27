import Hero from "@/components/home/Hero";
import Banner1 from "@/components/home/Banner1";
import MiniBanner from "@/components/home/MiniBanner";
import HomeService from "@/components/home/HomeService";
import LatestProduct from "@/components/home/LatestProduct";
import ProductCarousel from "@/components/home/ProductCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsLetter from "@/components/home/NewsLetter";
import BlogSection from "@/components/home/Blog";
import db from "@/utils/db";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import SubBlog from "@/models/SubBlog";
import Blog from "@/models/Blog";
import Slider from "@/models/Slider";
import Product from "@/models/Products";
import Head from "next/head";

export default function Home({
  blogs,
  mainSlider,
  latestProducts,
  discountedProducts,
  bestDealProducts,
  categories,
}) {
  const showToastMessage = (data) => {
    toast.success(data.msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,

      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <Head>
        <title> Safefoods | For Your Family </title>
        <meta
          name="description"
          content="Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption."
        />
        <link rel="icon" href="/assets/images/logo-safefoods.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Safefoods | For Your Family" />
        <meta property="og:url" content="https://safefoods.com.bd" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"
        />
        <meta property="og:site_name" content="https://safefoods.com.bd" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:site" content="@sajibahmed5282" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="https://safefoods.com.bd" />
        <meta
          name="twitter:description"
          content="Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption."
        />
        <meta
          property="twitter:url"
          content="https://twitter.com/sajibahmed5282/"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"
        />

        <link rel="canonical" href="https://safefoods.com.bd" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="grocery, safefood, safefoods, purer khabar, best online shop, deshi food, online grocery, online grocery shop, online grocery shopping, online grocery shop in Dhaka, online grocery shop in Bangladesh, online shop, online shopping, online shopping bd, daily bazaar, bd shopping, Best online grocery shopping in dhaka, Best online grocery in bangladesh, ecommerce grocery in bangladesh, Top ecommerce site in Dhaka,organic dry fish,pure honey bangladesh,buy foods in bangladesh, sutki fish price,dry fish or organic dry fish,grocery bd,organic dry fish,food and grocery shop in dhaka,green tea price in bangladesh,green tea price in bd,online grocery shop bd,grocery bangladesh,online grocery shopping in dhaka,organic tea in bangladesh, dry fish,shutki maach,buy mango online bangladesh, online shopping in bangladesh chittagong, online shopping in chittagong, buy online bangladesh,buy mango inline bangladesh, online shopping in chittagong bangladesh, buy online in bangladesh,healthy food in bangladesh,bd online shopping home delivery,online dhaka,best online in dhaka,online shop in bd,onlinee shop in bd,online shop in bangladesh, bd online shop,online shopping in bangladesh, online shop bd,online shob bd, online shop in dhaka, khaas meat, online shopping in bangladesh rajshahi, online shopping in bd, bd online, online shopping in dhaka,online shop bangladesh, food in bangladesh, trifola, bengladesh food near me, buy honey online,dhaka food offer, online shopping at bangladesh, shopping bd online, dairy milk price in bangladesh,online food delivery bd,bd food,online shopping bangladesh home delivery,online in bd,dhaka online shop,online shopping banglaedesh,online shopping bangladesh,bd online shopping,online shoping bangladesh,raw honey online,shutki bazar"
        />
      </Head>

      <div className="page-wrapper" style={{ padding: "5px" }}>
        <ToastContainer />

        <main className="main" style={{ backgroundColor: "#fafafa" }}>
          <Hero mainSlider={mainSlider} categories={categories} />
          <HomeService />

          {/* <MiniBanner  /> */}

          <LatestProduct
            products={latestProducts}
            showToastMessage={showToastMessage}
          />
          <Banner1 />
          <ProductCarousel
            title="Discounted Sales"
            products={discountedProducts}
            showToastMessage={showToastMessage}
          />
          <ProductCarousel
            title="Best Deals"
            products={bestDealProducts}
            showToastMessage={showToastMessage}
          />
          <BlogSection blogs={blogs} />
          <NewsLetter />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  db.connectDb();
  const blogData = await Blog.find({})
    .populate({ path: "subBlog", model: SubBlog })
    .sort({ updatedAt: -1 })
    .limit(5);
  const mainSliderData = await Slider.find({}).sort({ updatedAt: -1 });
  const categoryData = await Category.find({})
    .populate({ path: "subCategories", model: SubCategory })
    .sort({ updatedAt: -1 });
  const bestDealProductsData = await Product.find({ bestDeal: true });
  const discountedProductsData = await Product.find({ discountedSale: true });
  const latestProductsData = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(10);
  db.disconnectDb();
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogData)),
      mainSlider: JSON.parse(JSON.stringify(mainSliderData)),
      categories: JSON.parse(JSON.stringify(categoryData)),
      latestProducts: JSON.parse(JSON.stringify(latestProductsData)),
      discountedProducts: JSON.parse(JSON.stringify(discountedProductsData)),
      bestDealProducts: JSON.parse(JSON.stringify(bestDealProductsData)),
    },
    revalidate: 60,
  };
}
