import Image from "next/image";
import Link from "next/link";
import React from "react";

const DiscountBannerCarousel = ({ banner }) => {
  return (
    <div className="product d-flex flex-column overflow-hidden ">
      <figure className="mb-0 product-media bg-white d-flex justify-content-center align-items-center">
        {/* <span className="product-label label-sale">SALE</span> */}
        <Link href={`/product/${banner?.product.slug}`} className="w-100">
          <Image
            src={banner?.image}
            alt={banner?.title}
            className="w-full shadow-lg p-2"
            width={250}
            height={400}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </figure>
    </div>
  );
};

export default DiscountBannerCarousel;
