import { removeFromCart } from '@/store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux'

const CartProduct = ({cartProduct}) => {
    const dispatch = useDispatch();
  return (
    <div className="product">
    <div className="product-cart-details">
      <h4 className="product-title letter-spacing-normal font-size-normal">
        <Link href={`/product/${cartProduct.slug}`}>
          {cartProduct?.title}
        </Link>
      </h4>
      <span className="cart-product-info">

        <span className="cart-product-qty">{cartProduct?.quantity}</span>x ${cartProduct?.oneQuantityPrice}
      </span>
    </div>
    {/* End .product-cart-details */}
    <figure className="product-image-container">
      <Link href={`/product/${cartProduct.slug}`} className="product-image-cart">
        <Image
          src={cartProduct?.image}
          alt={cartProduct?.slug}
          width={200}
          height={300}
          priority={true}
        />
      </Link>
    </figure>
    <Link href="#" className="btn-remove" title="Remove Product" onClick={()=>{dispatch(removeFromCart({...cartProduct}))}}>
      <i className="icon-close" />
    </Link>
  </div>
  )
}

export default CartProduct