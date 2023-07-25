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
      <div>
        <Head>
          <title>Safefoods | For Your Family</title>
          <meta
            name="description"
            content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"
          />
          <link rel="icon" href="/assets/images/logo-safefoods.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:url" content="https://safefoods.com.bd" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Safefoods | For Your Family" />
          <meta
            property="og:description"
            content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"
          />
          <meta property="og:site_name" content="https://safefoods.com.bd" />

          <link rel="canonical" href="https://safefoods.com.bd" />
          <link rel="canonical" href="https://www.safefoods.com.bd" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:site" content="@sajibahmed5282" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Safefoods | For Your Family" />

          <meta
            name="twitter:description"
            content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"
          />
          <meta
            property="twitter:url"
            content="https://twitter.com/sajibahmed5282/"
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"
          />
     
        </Head>
      </div>
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
