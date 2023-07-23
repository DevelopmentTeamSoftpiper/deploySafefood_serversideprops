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
            {/* <img style={{ width: "100%" }} src={slider?.image} alt="Carousel Image" /> */}
            <Image width={1000} height={1000} src={slider?.image} alt="Carousel Image"  priority={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
