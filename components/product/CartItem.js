import React from 'react'
import Image from 'next/image'
import { useDispatch } from "react-redux";
import { removeFromCart } from '@/store/cartSlice';
import { updateCart } from '@/store/cartSlice';
import Link from 'next/link';
const CartItem = ({cartProduct}) => {

  const dispatch = useDispatch();
  const updateCartItem = (e, key)=>{
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      slug: cartProduct?.slug 
    }
    dispatch(updateCart(payload));
  }

  return (
    <tr key={cartProduct?.id}>
    <td className="product-col">
      <div className="product">
        <figure className="product-media">
          <Link href={`/product/${cartProduct.slug}`}>
            <Image
              src={
                cartProduct?.image
              }
              alt={cartProduct.slug}
              width={200}
              height={300}
              priority={true}
            />
          </Link>
        </figure>
        <h3 className="product-title">
          <Link href={`/product/${cartProduct.slug}`}>{cartProduct?.title}</Link>
        </h3>
        {/* End .product-title */}
      </div>
      {/* End .product */}
    </td>
    <td className="price-col">
      ${cartProduct?.oneQuantityPrice}
    </td>
    <td className="quantity-col">
      <div className="cart-product-quantity">
        <input
          type="number"
          className="form-control"
          defaultValue={cartProduct?.quantity}
          min={1}
          max={10}
          step={1}
          data-decimals={0}
          required=""
          onChange={(e)=> updateCartItem(e, "quantity")}
        />
      </div>
      {/* End .cart-product-quantity */}
    </td>
    <td className="total-col">${cartProduct?.price}</td>
    <td className="remove-col">
      <button className="btn-remove" onClick={()=>{dispatch(removeFromCart({...cartProduct}))}}>
        <i className="icon-close" />
      </button>
    </td>
  </tr>
  )
}

export default CartItem