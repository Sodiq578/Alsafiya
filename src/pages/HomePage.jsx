import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import SwiperSlider from "../components/SwiperSlider";
import CardImg from "../assets/doriButilka.png";
import Logo from "../assets/logoorg3.svg";
import Qalpoq from "../assets/qorbobo.webp"
const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Al-Safia Paracetamol",
      price: 12000,
      image: CardImg,
      description: "Isitmani tushirish va bosh og'rig'ini bartaraf etish uchun samarali vosita.",
    },
    {
      id: 2,
      title: "Al-Safia Ibuprofen",
      price: 15000,
      image: CardImg,
      description: "Og'riqni kamaytirish va yallig'lanishga qarshi kurashishda ishonchli tanlov.",
    },
    {
      id: 3,
      title: "Al-Safia Vitamin C",
      price: 10000,
      image: CardImg,
      description: "Immunitetni mustahkamlash va energiya darajasini oshirish uchun mo'ljallangan.",
    },
    {
      id: 4,
      title: "Al-Safia Antacid",
      price: 18000,
      image: CardImg,
      description: "Oshqozon kislotasini kamaytirish va yoqimsiz kuydiruvni bartaraf etish uchun.",
    },
    
  ];

  const handleCardClick = (card) => {
    navigate("/basket", { state: { product: card } });
  };

  useEffect(() => {
    const createSnowflake = () => {
      const snowflakeWrapper = document.createElement("div");
      const flakeSvg = `
        <svg width="40.108px" height="50.597px" viewBox="0 0 129.108 140.597" xml:space="preserve" class="flake">
          <path fill="#fff" d="M106.491,83.706l17.706,10.222l-4.067,7.046l-17.88-10.324l4.693,17.494l-7.814,2.096l-6.121-22.916l-0.604-2.402L71,72.519v25.01l1.569,1.627l16.848,16.906l-5.688,5.727L71,108.984V129h-8v-20.221l-12.917,12.807l-5.837-5.727l16.849-16.775L63,97.325V72.519L41.371,84.922l-0.79,2.402l-6.14,22.916l-7.823-2.096l4.688-17.494l-17.882,10.324l-4.068-7.046l17.705-10.222L9.566,79.018l2.096-7.823l23.095,6.188l2.223,0.596l21.66-12.505L37.157,53.071l-2.402,0.644l-22.916,6.14l-2.096-7.823l17.495-4.688L9.358,37.019l4.07-7.046l17.71,10.222l-4.678-17.494l7.842-2.096L40.525,43.7l0.669,2.223L63,58.428V33.622l-1.868-1.758L44.247,15.088l5.8-5.727L63,22.168V2h8v19.963L83.748,9.156l5.668,5.727L72.549,31.79L71,33.418v25.01l21.581-12.505l0.517-2.223l6.188-23.095l7.823,2.096l-4.688,17.494l17.705-10.222l4.068,7.046l-17.882,10.324l17.494,4.688l-2.096,7.823l-22.916-6.14l-2.402-0.644L74.911,65.473L96.57,77.979l2.223-0.596l23.095-6.188l2.096,7.823L106.491,83.706z"/>
        </svg>`;
      snowflakeWrapper.innerHTML = flakeSvg;

      const size = Math.random() * 0.4 + 0.3; // Kichikroq hajm
      const duration = Math.random() * 8 + 7; // Sekinroq tushish
      const left = Math.random() * 100; // Tasodifiy chapdan joylashuv
      const zIndex = Math.random() > 0.5 ? 0 : 10; // 50% orqadan, 50% oldindan o'tsin

      snowflakeWrapper.className = "flake-wrapper";
      snowflakeWrapper.style.transform = `scale(${size})`;
      snowflakeWrapper.style.left = `${left}%`;
      snowflakeWrapper.style.animationDuration = `${duration}s`;
      snowflakeWrapper.style.zIndex = zIndex;

      document.querySelector(".background").appendChild(snowflakeWrapper);

      setTimeout(() => {
        snowflakeWrapper.remove();
      }, duration * 1000);
    };

    const interval = setInterval(createSnowflake, 300); // Har 300ms da yangi qor parchasini yaratish

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <div className="background">
        <div className="bg-opacity"></div>
      </div>
     <div className="header-box">
      <div className="logo-container">
        {/* Logotip */}
        <img className="logo" src={Logo} alt="Logo" />
        {/* Qalpoq rasmi */}
        <img className="qalpoq" src={Qalpoq} alt="Qalpoq" />
      </div>
    </div>
      <SwiperSlider cards={cards} />
      <h1 className="title">Top Maxsulotlar</h1>
      <div className="card-container">
        {cards.map((card) => (
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
