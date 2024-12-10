import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MijozFirk1 from "../assets/mijozFirki.jpg";
import MijozFirk2 from "../assets/mijozFirki.jpg";
import Golos2 from "../assets/golos4.wav";
import Golos3 from "../assets/mijozfikriGolos2.ogg";
import Golos4 from "../assets/mijozFirki12.ogg";
import MijozFirki4 from "../assets/mijozfikri4.jpg";
import MijozFirk5 from "../assets/mijozfikri5.jpg";
import MijozFirk6 from "../assets/mijozfikri6.jpg";
import MijozFirki7 from "../assets/mijozFirki7.jpg";
import MijozFirki8 from "../assets/mijozFikir8.jpg";
import MijozFirki10 from "../assets/mijozfikri10.jpg";
import MijozFirki11 from "../assets/mijozfikri11.jpg";
import MijozFirki12 from "../assets/mijozFikri12.jpg";
import MijozFirki13 from "../assets/mijozFikri13.jpg";
import "./CategoryPage.css";

const CategoryPage = () => {
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const feedbacks = [
    { id: 1, text: "Tavsiya qilaman! ShifoBash Tibomed dorisi juda samarali bo‘ldi, rahmat!", author: "Omon" },
    { id: 2, text: "Doridan foydalanganimdan keyin o‘zimni ancha yaxshi his qildim. Rahmat!", author: "Dilnoza" },
    { id: 3, text: "ShifoBash dorisi kutganimdan ham yaxshiroq ta'sir qildi. Ishingizga rivoj!", author: "Azizbek" },
    { id: 4, text: "Tez yetkazib berish va sifatli mahsulot uchun rahmat! Mamnun bo'lsim.", author: "Madina" },
  ];

  const images = [
    MijozFirk1,
    MijozFirk2,
    MijozFirki4,
    MijozFirk5,
    MijozFirk6,
    MijozFirki7,
    MijozFirki8,
    MijozFirki10,
    MijozFirki11,
    MijozFirki12,
    MijozFirki13,
  ];

  const voiceRecordings = [
    { id: 1, url: Golos2, title: "Ovoz yozuvi 1" },
    { id: 2, url: Golos3, title: "Ovoz yozuvi 2" },
    { id: 3, url: Golos4, title: "Ovoz yozuvi 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Avtomatik almashish har 2 sekundda

    return () => clearInterval(interval);
  }, []);

  const openModal = (index) => setModalImageIndex(index);
  const closeModal = () => setModalImageIndex(null);

  const goToNextImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="category-page">
      {/* Customer Feedback */}
      <section className="feedback-section">
        <h2>Mijozlar Fikri</h2>
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <p>"{feedback.text}"</p>
              <span>- {feedback.author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Images Gallery */}
      <section className="images-section">
        <h2>Rasmlar</h2>
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery ${index + 1}`}
              className="gallery-image"
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </section>

      {/* Modal with Next and Prev buttons */}
      {modalImageIndex !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={images[modalImageIndex]} alt="Modal View" />
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <div className="modal-controls">
              <button onClick={goToPreviousImage}>
                <FaChevronLeft />
              </button>
              <button onClick={goToNextImage}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Recordings */}
      <section className="voices-section">
        <h2>Goloslar</h2>
        {voiceRecordings.map((voice) => (
          <div key={voice.id} className="voice-card">
            <audio controls>
              <source src={voice.url} type="audio/mpeg" />
              Sizning brauzeringiz ovozni qo‘llab-quvvatlamaydi.
            </audio>
            <p>{voice.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
