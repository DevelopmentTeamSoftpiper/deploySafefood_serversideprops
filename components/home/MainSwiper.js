/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

export default function MainSwiper({ mainSlider }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {mainSlider?.map((slider) => (
          <SwiperSlide key={slider?._id}>
            <Image
              width={1024}
              height={1000}
              priority={true}
              src={slider?.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Carousel Image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
