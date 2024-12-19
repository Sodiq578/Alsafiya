import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import CardImage from "../assets/omegaCard2.png";
import HeaderImg from "../assets/headeimg2.png";
import CardImage2 from "../assets/kist-ul-dori.jpg";
import cardImage3 from "../assets/black_sid-oil.jpg";
import { AiOutlineEye } from "react-icons/ai";
import Logo from "../assets/logo2.svg";
import { FaBuilding, FaBox, FaUsers, FaHandshake } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [animated, setAnimated] = useState(false);

  const [isUserModalOpen, setUserModalOpen] = useState(
    !localStorage.getItem("isModalShown")
  ); // Modal state
  const [userData, setUserData] = useState({ name: "", phone: "" }); // User data

  const token = "7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0"; // Telegram bot token
  const groupChatId = "-1002480723282"; // Telegram group chat ID

  const [counters, setCounters] = useState([
    { id: 1, icon: <FaBuilding size={60} color="#19524B" />, title: "Filiallar", value: 0, target: 4 },
    { id: 2, icon: <FaBox size={60} color="#19524B" />, title: "Mahsulotlar", value: 0, target: 8000 },
    { id: 3, icon: <FaUsers size={60} color="#19524B" />, title: "Mijozlarimiz", value: 0, target: 7420 },
    { id: 4, icon: <FaHandshake size={60} color="#19524B" />, title: "Hamkorlar", value: 0, target: 23 },
  ]);

  const cards = [
    {
      id: 3,
      title: "Qora sedana",
      price: 399000,
      image: cardImage3,
      description: "Qora sedana haqida batafsil ma'lumot.",
    },
    {
      id: 1,
      title: "Kist-ul Hindi",
      price: 400000,
      image: CardImage2,
      description: "Kist-ul Hindi haqida batafsil ma'lumot.",
    },
    {
      id: 2,
      title: "Omega-3",
      price: 399000,
      image: CardImage,
      description: "Omega-3 haqida batafsil ma'lumot.",
    },
    {
      id: 4,
      title: "Kist-ul Hindi",
      price: 400000,
      image: CardImage2,
      description: "Kist-ul Hindi haqida batafsil ma'lumot.",
    },
  ];

  useEffect(() => {
    const countArea = document.querySelector(".count-area");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          startCounters();
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countArea) observer.observe(countArea);

    return () => observer.disconnect();
  }, [animated]);

  const startCounters = () => {
    counters.forEach((counter, index) => {
      let current = 0;
      const target = counter.target;

      const interval = setInterval(() => {
        current += Math.ceil(target / 100);
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        updateCounter(index, current);
      }, 50);
    });
  };

  const updateCounter = (index, value) => {
    setCounters((prev) =>
      prev.map((counter, i) => (i === index ? { ...counter, value: value } : counter))
    );
  };

  const handleCardClick = (card) => {
    navigate("/basket", { state: { product: card } });
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) {
      value = "+998" + value.replace(/[^0-9]/g, "").slice(0, 10);
    } else {
      value = "+998" + value.slice(4).replace(/[^0-9]/g, "").slice(0, 10);
    }

    if (value.length <= 13) {
      setUserData((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleUserSubmit = () => {
    if (userData.name && userData.phone) {
      const message = `👤 Ismi: ${userData.name}\n📞 Telefon: ${userData.phone}`;
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: groupChatId, text: message }),
      }).then(() => {
        setUserModalOpen(false);
        setUserData({ name: "", phone: "" });
        localStorage.setItem("isModalShown", "true");
      });
    }
  };

  return (
    <div className="home-page">
      {isUserModalOpen && (
        <div className="user-modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Batavsil bilish uchun</h2>
            <input
              type="text"
              placeholder="Ismingizni kiriting"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="tel"
              placeholder="Telefon raqamingizni kiriting"
              value={userData.phone}
              onChange={handlePhoneChange}
              maxLength="13"
            />
            <button onClick={handleUserSubmit}>Yuborish</button>
          </div>
        </div>
      )}
      <div className="header-box">
        <img className="header-img" src={HeaderImg} alt="Header" />
        <img className="logo-img" src={Logo} alt="Header Logo" />
      </div>

      <h1 className="title">Top Mahsulotlar</h1>

      <div className="container card-container">
        {cards.map((card) => (
          <div className="card" key={card.id} onClick={() => handleCardClick(card)}>
            <div className="card-image-wrapper">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="overlay-icon" onClick={() => openImageModal(card.image)}>
                <AiOutlineEye size={20} />
              </div>
            </div>
            <div className="card-details">
              <h3 className="card-title">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="count-area">
        <div className="container">
          <h2 className="title">Statistika</h2>
          <div className="row">
            {counters.map((counter) => (
              <div className={`col-md-3 count-card ${animated ? "animate" : ""}`} key={counter.id}>
                <div className="count-area-content">
                  <div className="count-icon">{counter.icon}</div>
                  <div className="count-digit">{counter.value}</div>
                  <div className="count-title">{counter.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isImageModalOpen && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full-size" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
