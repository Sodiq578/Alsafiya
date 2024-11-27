import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const SwiperSlider = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div className="slider-item">Welcome to Gumma-Mobile</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slider-item">Explore our products</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;
