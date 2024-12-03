import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import basketIcon from '../assets/Heart.svg';
import Location from '../assets/location.svg';
import SwiperSlider from '../components/SwiperSlider';
import CardImg from '../assets/image.png';

const HomePage = ({ setCartItems, cartItems = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationText, setLocationText] = useState(
    localStorage.getItem('locationText') || 'Тошкент, Мирзо Улугбек район'
  );

  const searchInputRef = useRef(null);
  const map = useRef(null);

  const cards = [
    { id: 1, title: 'Palov Uzumli', price: '8,000 UZS', image: CardImg, },
    { id: 2, title: 'Somsa Go‘shtli', price: '5,000 UZS', image: CardImg },
    { id: 3, title: 'Shashlik Qo‘ziqorinli', price: '10,000 UZS', image: CardImg },
  ];

  useEffect(() => {
    setFilteredCards(cards);
  }, []);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = value
      ? cards.filter((card) => card.title.toLowerCase().includes(value.toLowerCase()))
      : cards;

    setFilteredCards(filtered);
  };

  const handleClearInput = () => {
    setInputValue('');
    setFilteredCards(cards);
    searchInputRef.current.focus();
  };

  const handleIconClick = (card) => {
    if (!cartItems.some((item) => item.id === card.id)) {
      setCartItems((prevItems) => [...prevItems, { ...card, quantity: 1 }]);
    }
  };

  const initializeYandexMap = () => {
    window.ymaps.ready(() => {
      map.current = new window.ymaps.Map('yandex-map', {
        center: [41.2995, 69.2701], // Tashkent default location
        zoom: 12,
      });

      const placemark = new window.ymaps.Placemark([41.2995, 69.2701], {
        balloonContent: locationText,
      });

      map.current.geoObjects.add(placemark);

      map.current.events.add('click', (e) => {
        const coords = e.get('coords');
        const geocoder = window.ymaps.geocode(coords);

        geocoder.then((res) => {
          const firstGeoObject = res.geoObjects.get(0);
          if (firstGeoObject) {
            const address = firstGeoObject.getAddressLine();
            setLocationText(address);
          }
        });
      });
    });
  };

  const handleLocationButtonClick = () => {
    setIsModalVisible(true);
    initializeYandexMap();
  };

  const handleLocationSave = () => {
    localStorage.setItem('locationText', locationText);
    setIsModalVisible(false);
    alert(`Manzil saqlandi: ${locationText}`);
  };

  return (
    <div className="home-page">
      <div className="header-box">
        <form className="search-form">
          <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              ref={searchInputRef}
              className="search-input"
              value={inputValue}
              onChange={handleSearchInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {inputValue && (
              <MdClear className="clear-icon" onClick={handleClearInput} />
            )}
          </div>
        </form>
        {!isFocused && (
          <button className="btn-location" onClick={handleLocationButtonClick}>
            <img src={Location} alt="Location Icon" />
            <span className="location-text">{locationText}</span>
          </button>
        )}
      </div>

      <SwiperSlider cards={cards} />

      <h1 className="title">Sotuv Xitlari</h1>
      <div className="card-container">
        {filteredCards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.image} alt={card.title} className="card-image" />
            <p className="price">{card.price}</p>
            <h3 className="card-title">{card.title}</h3>
            <button className="basket-icon" onClick={() => handleIconClick(card)}>
              <img src={basketIcon} alt="Add to basket" />
            </button>
          </div>
        ))}
      </div>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalVisible(false)}>
              Close
            </button>
            <h2>Manzilni belgilang</h2>
            <p>Hozirgi Manzil: {locationText}</p>
            <div id="yandex-map" style={{ width: '100%', height: '300px' }}></div>
            <button className="save-location-btn" onClick={handleLocationSave}>
              Manzilni saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
