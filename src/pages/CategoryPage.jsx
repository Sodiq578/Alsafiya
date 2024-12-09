import React, { useState } from "react";
import MijozFirk1 from "../assets/mijozFirki.jpg";
import MijozFirk2 from "../assets/mijozFirki.jpg";
import Golos from "../assets/golos.mp3";
import "./CategoryPage.css";

const CategoryPage = () => {
  const [modalImage, setModalImage] = useState(null);

  const feedbacks = [
    { id: 1, text: "Juda yaxshi xizmat!", author: "Omon" },
    { id: 2, text: "Mamnun qoldim, rahmat!", author: "Dilnoza" },
  ];

  const images = [MijozFirk1, MijozFirk2];

  const voiceRecordings = [
    { id: 1, url: Golos, title: "Ovoz yozuvi 1" },
    { id: 2, url: Golos, title: "Ovoz yozuvi 2" },
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
              Your browser does not support the audio element.
            </audio>
            <p>{voice.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
