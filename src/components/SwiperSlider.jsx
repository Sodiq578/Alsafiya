import React, { useState, useEffect } from 'react';
import './SwiperSlider.css';
import SwiperImg from "../assets/user_image_20241202_111508296c875157d.png"; // Import your image

const SwiperSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Active index for the slider
  const [startTouch, setStartTouch] = useState(0); // Touch start for swipe

  // Sample images array (all using the same imported image)
  const images = [
    { id: 1, image: SwiperImg },
    { id: 2, image: SwiperImg },
    { id: 3, image: SwiperImg },
    { id: 4, image: SwiperImg },
  ];

  // Handle previous slide
  const handlePrevSlide = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  // Handle next slide
  const handleNextSlide = () => {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Handle touch start for swipe
  const handleTouchStart = (e) => {
    setStartTouch(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const moveTouch = e.touches[0].clientX;
    if (startTouch - moveTouch > 50) {
      handleNextSlide();
    } else if (moveTouch - startTouch > 50) {
      handlePrevSlide();
    }
  };

  return (
    <div className="custom-slider" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <div className="slider-content" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            className={`slider-item ${index === activeIndex ? 'active' : ''}`}
            key={image.id}
          >
            <img src={image.image} alt={`Slider ${image.id}`} className="slider-img" />
          </div>
        ))}
      </div>

      {/* Pagination (Navigation dots) */}
      <div className="slider-pagination">
        {images.map((_, index) => (
          <span
            key={index}
            className={`pagination-bullet ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SwiperSlider;
