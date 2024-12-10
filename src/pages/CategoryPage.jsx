import React, { useState } from "react";
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
  const [modalImage, setModalImage] = useState(null);

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

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

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

      {/* Images */}
      <section className="images-section">
        <h2>Rasmlar</h2>
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery ${index + 1}`}
              className="gallery-image"
              onClick={() => openModal(image)}
            />
          ))}
        </div>
        {modalImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content">
              <img src={modalImage} alt="Modal View" />
            </div>
          </div>
        )}
      </section>

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
