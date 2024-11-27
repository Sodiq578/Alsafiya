import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { FaSearch } from 'react-icons/fa'; // Qidiruv ikonkasi
import basketIcon from '../assets/Heart.svg'; // Savat ikonkasi uchun to'g'ri yo'l
import Location from "../assets/location.svg";

const HomePage = () => {
  const [cartItems, setCartItems] = useState([]); // Savatcha uchun holat
  const [activeIndex, setActiveIndex] = useState(0); // Slayderning faol indexi
  const [startTouch, setStartTouch] = useState(0); // Sensorli ekranga teginishni boshqarish
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Input value uchun holat
  const [isActive, setIsActive] = useState(false); // Location buttonni aktivlashtirish uchun holat

  const cards = [
    { id: 1, title: 'Gumma Kartoshkali', price: '5,000 UZS', image: 'https://picsum.photos/200/300?random=1' },
    { id: 2, title: 'Gumma Qovurilgan', price: '5,000 UZS', image: 'https://picsum.photos/200/300?random=2' },
    { id: 3, title: 'Gumma Go‘shtli', price: '5,000 UZS', image: 'https://picsum.photos/200/300?random=3' },
    { id: 4, title: 'Gumma Sariyog‘li', price: '5,000 UZS', image: 'https://picsum.photos/200/300?random=4' },
  ];

  const handleIconClick = (card) => {
    if (cartItems.includes(card)) {
      setCartItems(cartItems.filter(item => item.id !== card.id));
    } else {
      setCartItems([...cartItems, card]);
    }
  };

  const handlePrevSlide = () => {
    setActiveIndex(activeIndex === 0 ? cards.length - 1 : activeIndex - 1);
  };

  const handleNextSlide = () => {
    setActiveIndex(activeIndex === cards.length - 1 ? 0 : activeIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLocationButtonClick = () => {
    setInputValue(""); // Inputni tozalash
    setIsActive(!isActive); // Buttonni faollashtirish / faolligini olib tashlash
  };

  return (
    <div className="home-page">
      {/* Qidiruv va joylashuv */}
      <div className="header-box">
        <form className="search-form">
          <FaSearch
            className="search-icon"
            onClick={handleFocus} // Ikonka bosilganda inputga fokus qo'yish
          />
          <input
            type="text"
            className="search-input"
            name="search"
            value={inputValue} // Inputni boshqarish
            onChange={handleSearchInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </form>
        <button 
          className={`location-btn ${isActive ? 'active' : ''}`}
          onClick={handleLocationButtonClick}
        >
          <img src={Location} alt="Location Icon" />
          {!isFocused && <span className="location-text">Ташкент, Мирзо Улугбек район, Карасув-3, улица Мингбулок, 38</span>}
        </button>
      </div>

      {/* Custom Slider */}
      <div className="custom-slider" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
        <div className="slider-content" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {cards.map(card => (
            <div className="slider-item" key={card.id}>
              <img src={card.image} alt="Slider" className="slider-img" />
            </div>
          ))}
        </div>

        {/* Slider Pagination */}
        <div className="slider-pagination">
          {cards.map((_, index) => (
            <span
              key={index}
              className={`pagination-bullet ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            ></span>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="slider-controls">
          <button className="prev-slide" onClick={handlePrevSlide}>❮</button>
          <button className="next-slide" onClick={handleNextSlide}>❯</button>
        </div>
      </div>

      {/* Cardlar */}
      <h1 className="title">Sotuv Xitlari</h1>
      <div className="card-container">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div className="card-image">
              <img src={card.image} alt={card.title} />
              <div
                className={`basket-icon ${cartItems.includes(card) ? 'active' : ''}`}
                onClick={() => handleIconClick(card)}
              >
                <img src={basketIcon} alt="Basket" />
              </div>
            </div>
            <p className="price">{card.price}</p>
            <h3 className="card-title">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
