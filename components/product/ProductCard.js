import { addToCart } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const ProductCard = ({ data, showToastMsg }) => {
  const dispatch = useDispatch();
  return (
    <div className="product d-flex flex-column overflow-hidden ">
      <figure className="mb-0 product-media bg-white d-flex justify-content-center align-items-center">
        <span className="product-label label-sale">SALE</span>
        <Link href={`/product/${data?.slug}`} className="w-100">
          <Image
            src={data?.image}
            alt={data?.slug}
            className="product-image"
            width={239}
            height={239}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </figure>

      <div className="product-body pb-1">
        <div className="text-left product-cat font-weight-normal text-light mb-0">
          <Link href={`/subcategory/${data.subCategory.slug}`}>
            {" "}
            {data.subCategory.name}
          </Link>
        </div>
        {/* End .product-cat  */}

        <div style={{ minHeight: "60px" }}>
          <h4 className="product-title letter-spacing-normal font-size-normal text-left mb-0">
            <Link href={`/product/${data.slug}`}>
              {data?.title?.length > 50 ? (
                <span> {data?.title?.substring(0, 40)}... </span>
              ) : (
                <span> {data?.title} </span>
              )}
            </Link>
          </h4>
        </div>
        {/* End .product-title letter-spacing-normal font-size-normal */}
        <div className="product-price mb-1">
          <div className="new-price">৳{data.price}</div>
          <div className="old-price font-size-normal font-weight-normal">
            ৳{data.originalPrice}
          </div>
        </div>
        {/* End .product-price */}
      </div>
      <div className="product-action position-relative visible">
        <button
          className="btn-product btn-cart text-uppercase text-dark text-decoration-none"
          disabled={Number(data?.stock) === 0 }
          onClick={() => {
            dispatch(
              addToCart({
                ...data,
                oneQuantityPrice: parseInt(data?.price),
                quantity: 1,
              })
            );
            showToastMsg({
              msg: `${data?.title} is added to the cart`,
            });
          }}
        >
          <span className={`shadow-none ${Number(data?.stock) === 0 ? "text-danger" :"text-dark" } `}>
            {Number(data?.stock) === 0 ? "Out of stock" : "add to cart"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
