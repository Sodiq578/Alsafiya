import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import CardImage from "../assets/omegaCard2.png";
import HeaderImg from "../assets/headeimg2.png";
import CardImage2 from "../assets/kist-ul-dori.jpg";
import cardImage3 from "../assets/black_sid-oil.jpg";
import { AiOutlineEye } from "react-icons/ai";
import Logo from "../assets/logo2.svg"


// Import React Icons at the top
import { FaBuilding, FaBox, FaUsers, FaHandshake } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [animated, setAnimated] = useState(false);


  
  const [counters, setCounters] = useState([
    {
      id: 1,
      icon: <FaBuilding size={60} color="#19524B" />,
      title: "Filiallar",
      value: 0,
      target: 4,
    },
    {
      id: 2,
      icon: <FaBox size={60} color="#19524B" />,
      title: "Mahsulotlar",
      value: 0,
      target: 8000,
    },
    {
      id: 3,
      icon: <FaUsers size={60} color="#19524B" />,
      title: "Mijozlarimiz",
      value: 0,
      target: 7420,
    },
    {
      id: 4,
      icon: <FaHandshake size={60} color="#19524B" />,
      title: "Hamkorlar",
      value: 0,
      target: 23,
    },
  ]);

  const cards = [
    {
      id: 1,
      title: "Kist-ul Hindi",
      price: 400000,
      image: CardImage2,
      description: "Tibbio Tibomed kompaniyasi sog‘liqni saqlash sohasida o‘zining yuqori sifatli biologik faol qo‘shimchalari bilan tanilgan. Ushbu kompaniya tomonidan ishlab chiqarilgan Omega-3 kapsulalari – sog‘lom turmush tarzini qo‘llab-quvvatlashga qaratilgan mukammal mahsulotdir. Omega-3 ning ilmiy asoslangan foydalari va Tibbio Tibomed kompaniyasining mukammallikka intilishi bu mahsulotni sog‘lom hayot uchun ajralmas tanlovga aylantiradi.",
    },

    {
      id: 2,
      title: "Omega-3",
      price: 399000,
      image: CardImage,
      description: "Miya faoliyati: Xotira va konsentratsiyani yaxshilaydi, stressni kamaytirishga yordam beradi.Ko'z sog'ligi: Ko'rishni mustahkamlaydi, ko‘z charchoqlarini kamaytiradi. Immunitet: Tabiiy himoya tizimini kuchaytirib, kasalliklarga qarshi kurashishda yordam beradi. Teri va soch: Teri elastikligini oshirib, yosh va sog‘lom ko‘rinishni saqlaydi; sochlarni mustahkam va yorqin qiladi.",
    },

    {
      id: 3,
      title: "Qora sedana",
      price: 399000 ,
      image: cardImage3,
      description: "Qora sedana – qadimiy davolovchi o‘simlik bo‘lib, uning urug‘lari ko‘plab xalqlarning an’anaviy tabobatlarida keng qo‘llanib kelinadi. U asosan Janubi-G‘arbiy Osiyo, Yaqin Sharq, Hindiston va Shimoliy Afrika hududlarida o‘sadi. Qur'oni Karimda ham qora sedana (Habba Sauda) haqida zikr qilingan va bu o‘simlikning shifobaxsh xususiyatlari Payg‘ambarimiz Muhammad (s.a.v.) hadislarida maqtov bilan tilga olingan.",
    },
    {
      id: 4,
      title: "Kist-ul Hindi",
      price: 400000,
      image: CardImage2,
      description: "Tibbio Tibomed kompaniyasi sog‘liqni saqlash sohasida o‘zining yuqori sifatli biologik faol qo‘shimchalari bilan tanilgan. Ushbu kompaniya tomonidan ishlab chiqarilgan Omega-3 kapsulalari – sog‘lom turmush tarzini qo‘llab-quvvatlashga qaratilgan mukammal mahsulotdir. Omega-3 ning ilmiy asoslangan foydalari va Tibbio Tibomed kompaniyasining mukammallikka intilishi bu mahsulotni sog‘lom hayot uchun ajralmas tanlovga aylantiradi.",
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

    observer.observe(countArea);

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
      prev.map((counter, i) =>
        i === index ? { ...counter, value: value } : counter
      )
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
  return (
    <div className="home-page">
      <div className="header-box">
        <img className="header-img" src={HeaderImg} alt="Header" />
        <img className="logo-img" src={Logo} alt="Header Logo" />
      </div>

      <h1 className="title">Top Maxsulotlar</h1>

      <div className="container card-container">
  {cards.map((card) => (
    <div className="card" key={card.id} onClick={() => handleCardClick(card)}>
      <div className="card-image-wrapper">
        <img
          src={card.image}
          alt={card.title}
          className="card-image"
        />
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
              <div
                className={`col-md-3 count-card ${animated ? "animate" : ""}`}
                key={counter.id}
              >
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
