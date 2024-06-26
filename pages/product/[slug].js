import React, { useState } from "react";
import { fetchDataFromApi, getData } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db from "@/utils/db";
import Product from "@/models/Products";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import RelatedProducts from "@/components/product/RelatedProduct";
import CustomHead from "@/components/CustomHead";


const ProductDetails = ({ product, products }) => {
  const p = product;
  const dispatch = useDispatch();
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

  const [quantity, setQuantity] = useState(1);
  const htmlContent = p?.description;
  return (
    <>
      <CustomHead
        title={p?.title}
        description={p?.shortDescription}
        url={`https://safefoods.com.bd/product/${p?.slug}`}
        image={p?.image}
      />
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container d-flex align-items-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Products</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {p?.title}
              </li>
            </ol>
          </div>
        </nav>
        <ToastContainer />

        <div className="page-content">
          <div className="container">
            <div className="product-details-top">
              <div className="row">
                <div className="col-md-6">
                  <div className="product-gallery product-gallery-vertical">
                    <div className="row">
                      <figure className="product-main-image">
                        <Image
                          id="product-zoom"
                          src={p?.image}
                          data-zoom-image={p?.image}
                          width={300}
                          height={300}
                          alt={p?.title}
                          priority={true}
                        />
                        {/* <Link
                        href="#"
                        id="btn-product-gallery"
                        className="btn-product-gallery"
                      >
                        <i className="icon-arrows" />
                      </Link> */}
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-details">
                    <h1 className="product-title">{p?.title}</h1>

                    <div className="product-price">{p?.price}BDT</div>
                    <div className="product-content">
                      <p>{p?.shortDescription}</p>
                    </div>
                    {/* 
              <div className="details-filter-row details-row-size">
                <label htmlFor="size">Size:</label>
                <div className="select-custom">
                  <select name="size" id="size" className="form-control">
                    <option value="#" selected="selected">
                      Select a size
                    </option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>
               
              
              </div> */}
                    <div className="details-filter-row details-row-size">
                      <label htmlFor="qty">Qty:</label>
                      <div className="product-details-quantity">
                        <input
                          type="number"
                          id="qty"
                          className="form-control"
                          defaultValue={1}
                          min={1}
                          max={10}
                          step={1}
                          data-decimals={0}
                          required=""
                          disabled={Number(p.stock) === 0}
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="product-details-action">
                      <button
                        className="btn-product btn-cart"
                        disabled={Number(p.stock) === 0}
                        onClick={() => {
                          dispatch(
                            addToCart({
                              ...p,
                              oneQuantityPrice: p?.price,
                              quantity: quantity,
                            })
                          );
                          toast.success("Product Added to Cart", {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          });
                        }}
                      >
                        <span id="btn-add-to-cart" className={`${Number(p?.stock) === 0 ? "text-danger" :"text-green" } `}>
                          {Number(p.stock) === 0
                            ? "Out of Stock"
                            : "Add to card"
                            }
                        </span>
                      </button>
                    </div>
                    <div className="product-details-footer">
                      <div className="product-cat ml-2">
                        <span>Category:</span>

                        <Link
                          href={`/category/${p?.category?.slug}`}
                          style={{ color: "#61AB00", fontWeight: 600 }}
                        >
                          {p?.category?.name}
                        </Link>
                      </div>
                      <div className="product-cat ml-2">
                        <span>Sub-Category:</span>

                        <Link
                          href={`/subcategory/${p?.subCategory?.slug}`}
                          style={{ color: "#61AB00", fontWeight: 600 }}
                        >
                          {p?.subCategory?.name}
                        </Link>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="product-details-tab">
              <ul
                className="nav nav-pills justify-content-start"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="product-desc-link"
                    data-toggle="tab"
                    href="#product-desc-tab"
                    role="tab"
                    aria-controls="product-desc-tab"
                    aria-selected="true"
                  >
                    Description
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="product-desc-tab"
                  role="tabpanel"
                  aria-labelledby="product-desc-link"
                >
                  <div className="product-desc-content">
                    <h3>Product Information</h3>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RelatedProducts
            products={products}
            showToastMessage={showToastMessage}
          />
        </div>
      </main>
    </>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  db.connectDb();
  const products = await Product.find({}).sort({ updatedAt: -1 });
  const paths = products?.map((p) => ({
    params: {
      slug: p?.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {
  const productData = await Product.findOne({ slug: slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategory", model: SubCategory });
  const productsData = await Product.find({ category: productData.category });

  db.disconnectDb();
  return {
    props: {
      product: JSON.parse(JSON.stringify(productData)),
      products: JSON.parse(JSON.stringify(productsData)),
      slug,
    },
    revalidate: 60,
  };
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   const product = await getData(
//     `/api/admin/product/find?slug=${slug}`
//   );

//   return {
//     props: {
//       product,
//       slug,
//     },
//   };
// }
