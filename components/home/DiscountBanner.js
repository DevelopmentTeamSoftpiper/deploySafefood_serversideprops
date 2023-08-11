import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Mousewheel, Navigation } from "swiper";
import DiscountBannerCarousel from "./DiscountBannerCarousel";

const DiscountBanner = ({ dBanners }) => {
  
  return (
    <div className="container deal-section">
      <h3 className="title text-center mt-1 font-weight-bold"> Discount Product </h3>

      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        navigation={true}
        mousewheel={false}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {dBanners?.map((banner) => (
          <SwiperSlide key={banner?._id}>
                <DiscountBannerCarousel banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountBanner;
