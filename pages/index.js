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


export default function Home({ blogs,mainSlider,latestProducts,discountedProducts,bestDealProducts,categories}) {
const showToastMessage =(data)=>{
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
      <div className="page-wrapper" style={{padding:"10px"}}>
      <ToastContainer/>


        <main className="main" style={{ backgroundColor: "#fafafa" }}>
          <Hero mainSlider={mainSlider} categories ={categories}/>
          <HomeService />

          {/* <MiniBanner  /> */}
         
          <LatestProduct  products={latestProducts} showToastMessage={showToastMessage} />
          <Banner1/>
          <ProductCarousel title="Discounted Sales" products={discountedProducts} showToastMessage={showToastMessage} />
          <ProductCarousel title="Best Deals" products={bestDealProducts} showToastMessage={showToastMessage} /> 
          <BlogSection blogs={blogs} />
          <NewsLetter/>
        </main>
 
      </div>

    </>
  );
}

export async function getStaticProps() {
  db.connectDb();
  const blogData = await Blog.find({}).populate({path:'subBlog', model:SubBlog})
  .sort({ updatedAt: -1 }).limit(5);
  const mainSliderData = await Slider.find({}).sort({ updatedAt: -1 });
  const categoryData = await Category.find({}).populate({path:'subCategories',model: SubCategory}).sort({ updatedAt: -1 });
  const bestDealProductsData =  await Product.find({ bestDeal: true });
  const discountedProductsData= await Product.find({ discountedSale: true });
  const latestProductsData = await Product.find({}).sort({ createdAt: -1 }).limit(10);
  db.disconnectDb();
  return {
    props: {

      
      blogs: JSON.parse(JSON.stringify(blogData)),
      mainSlider: JSON.parse(JSON.stringify(mainSliderData)),
      categories: JSON.parse(JSON.stringify(categoryData)),
      latestProducts:JSON.parse(JSON.stringify(latestProductsData)),
      discountedProducts: JSON.parse(JSON.stringify(discountedProductsData)),
      bestDealProducts:JSON.parse(JSON.stringify(bestDealProductsData)),

      
    },
    revalidate:60
  };
}
