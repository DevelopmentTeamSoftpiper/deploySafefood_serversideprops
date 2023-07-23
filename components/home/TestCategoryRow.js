/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TestCategoryRow = ({pd}) => {
    const {title} = pd.attributes;
    return (
        <div className="product d-flex flex-column overflow-hidden">
        <figure className="mb-0 product-media bg-white d-flex justify-content-center align-items-center">
        <span className="product-label label-top text-uppercase">
            Top
        </span>
        <Link href="product.html" className="w-100">
            <Image
            src="assets/images/demos/demo-26/products/product-7.jpg"
            alt="Product image"
            className="product-image"
            width={192}
            height={192}
            priority={true}
            />
            <Image
            src="assets/images/demos/demo-26/products/product-7-2.jpg"
            alt="Product image"
            className="product-image-hover"
            width={192}
            height={192}
            priority={true}
            />
        </Link>
        <div className="product-action-vertical">
            <Link
            href="#"
            className="btn-product-icon text-dark btn-wishlist"
            title="Add to wishlist"
            >
            <span>add to wishlist</span>
            </Link>
            <Link
            href="popup/quickView.html"
            className="btn-product-icon text-dark btn-quickview"
            title="Quick view"
            >
            <span>Quick view</span>
            </Link>
            <Link
            href="#"
            className="btn-product-icon text-dark btn-compare"
            title="Compare"
            >
            <span>Compare</span>
            </Link>
        </div>
        {/* End .product-action-vertical */}
        </figure>
        {/* End .product-media bg-white d-flex justify-content-center align-items-center */}
        <div className="product-body">
        <div className="product-cat mb-0 text-light text-left">
            <Link href="#">Audio</Link>
        </div>
        {/* End .product-cat  */}
        <h3 className="product-title letter-spacing-normal font-size-normal mb-0 text-left">
            <Link href="product.html">Bose - SoundLink Bluetooth Speaker</Link>
        </h3>
        {/* End .product-title letter-spacing-normal font-size-normal */}
        <div className="product-price mb-1 text-dark">$99.99</div>
        {/* End .product-price */}
        <div className="ratings-container">
            <div className="ratings">
            <div className="ratings-val" style={{ width: "60%" }} />
            {/* End .ratings-val */}
            </div>
            {/* End .ratings */}
            <span className="ratings-text ml-2">( 4 Reviews )</span>
        </div>
        {/* End .rating-container */}
        </div>
        {/* End .product-body */}
        <div className="product-action position-relative visible">
        <Link
            href="#"
            className="btn-product btn-cart btn-select text-uppercase text-dark text-decoration-none"
            title="Add to cart"
        >
            <span className="text-dark shadow-none">Select Options</span>
        </Link>
        </div>
    </div>
    );
};

export default TestCategoryRow;