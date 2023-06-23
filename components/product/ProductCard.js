import { addToCart } from '@/store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';

const ProductCard = ({data, showToastMsg}) => {

    const dispatch = useDispatch();
  return (
    <div className="product d-flex flex-column overflow-hidden p-1">
    <figure className="mb-0 product-media bg-white d-flex justify-content-center align-items-center">
      <span className="product-label label-sale">SALE</span>
      <Link href={`/product/${data?.slug}`} className="w-100">
        <Image
          src={data?.image}
          alt="Product image"
          className="product-image"
          width={239}
          height={239}
        />
       
      </Link>

    </figure>
    

    <div className="product-body pb-1">
      <div className="text-left product-cat font-weight-normal text-light mb-0">
        <Link href={`/subcategory/${data.subCategory.slug}`}>  {data.subCategory.name}</Link>
      </div>
      {/* End .product-cat  */}

      <div style={{minHeight:"45px"}}>
      <h3 className="product-title letter-spacing-normal font-size-normal text-left mb-0">
      <Link href={`/product/${data.slug}`}>
        {
           data?.title?.length > 50 ? <span> {data?.title?.substring(0,40)}... </span>
            : <span> {data?.title} </span>
            }
      </Link>

      </h3>
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
        onClick={()=>{
          dispatch(addToCart({
            ...data,
            oneQuantityPrice:parseInt( data?.price),
            quantity:1
          }));
          showToastMsg({
            msg: `${data?.title} is added to the cart`
          })

        }}
      >
        <span className="text-dark shadow-none">add to cart</span>
      </button>
    </div>
  </div>
  )
}

export default ProductCard