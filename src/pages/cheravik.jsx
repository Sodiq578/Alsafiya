import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import SwiperSlider from "../components/SwiperSlider";
import CardImg from "../assets/doriButilka.png";
import Logo from "../assets/logoorg3.svg";

const HomePage = () => {
  const [filteredCards, setFilteredCards] = useState([]);
  const navigate = useNavigate();

const cards = [
  {
    id: 1,
    title: "Al-Safia Paracetamol",
    price: 12000,
    image: CardImg,
    description: "Isitmani tushirish va bosh og'rig'ini bartaraf etish uchun samarali vosita. Yumshoq formulasi tufayli qo'llash oson va nojo'ya ta'sirlari kam.",
  },
  {
    id: 2,
    title: "Al-Safia Ibuprofen",
    price: 15000,
    image: CardImg,
    description: "Og'riqni kamaytirish va yallig'lanishga qarshi kurashishda ishonchli tanlov. Tez ta'sir qiluvchi va uzoq davom etuvchi formulaga ega.",
  },
  {
    id: 3,
    title: "Al-Safia Vitamin C",
    price: 10000,
    image: CardImg,
    description: "Immunitetni mustahkamlash va energiya darajasini oshirish uchun mo'ljallangan. Tabiiy antioksidant xususiyatlarga ega.",
  },
  {
    id: 4,
    title: "Al-Safia Antacid",
    price: 18000,
    image: CardImg,
    description: "Oshqozon kislotasini kamaytirish va yoqimsiz kuydiruvni bartaraf etish uchun samarali dori. Ovqat hazm qilishni yaxshilaydi.",
  },
  {
    id: 5,
    title: "Al-Safia Cough Syrup",
    price: 20000,
    image: CardImg,
    description: "Yo'talni tinchlantiruvchi va nafas yo'llarini tozalovchi sirop. Sovuq kunlar va shamollash mavsumida ishonchli yordamchingiz.",
  },
  {
    id: 6,
    title: "Al-Safia Multivitamin",
    price: 25000,
    image: CardImg,
    description: "Tanangizga zarur bo'lgan barcha vitamin va minerallarni taqdim etuvchi ko'p funksiyali qo'shimcha. Energiya va immunitetni oshiradi.",
  },
];


  useEffect(() => {
    setFilteredCards(cards);
  }, []);

  const handleCardClick = (card) => {
    navigate("/basket", { state: { product: card } });
  };

  return (
    <div className="home-page">
      <div className="header-box">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      <SwiperSlider cards={cards} />
      <h1 className="title">Sotuv Xitlari</h1>
      <div className="card-container">
        {filteredCards.map((card) => (
          <div
            className="card"
            key={card.id}
            onClick={() => handleCardClick(card)}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
