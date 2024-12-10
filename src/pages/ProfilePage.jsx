import React, { useState } from 'react';
import './ProfilePage.css';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [satisfaction, setSatisfaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form ma'lumotlarini o‘zgartirish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Telegram'ga yuborish funktsiyasi
  const sendToTelegram = async () => {
    const token = "7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0";
    const personalChatId = "5838205785";
    const groupChatId = "-1002480723282";

    const message = `
📢 Taklif va Shikoyatlar:
👤 Ism: ${formData.name}
📧 Email: ${formData.email}
💬 Xabar: ${formData.message}
😃 Mamnunmi: ${satisfaction ? "Ha 😊" : "Yo'q 😔"}
    `;

    try {
      // Personal chatga yuborish
      const personalResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: personalChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      // Group chatga yuborish
      const groupResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: groupChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (personalResponse.ok && groupResponse.ok) {
        alert("Xabaringiz yuborildi. Rahmat!");
        setFormData({ name: "", email: "", message: "" });
        setSatisfaction(null);
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko‘ring.");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
    }
  };

  // Submit funktsiyasi
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSubmit = () => {
    setShowModal(false);
    sendToTelegram();
  };

  return (
    <div className="profile-page">
      <div className="form-container">
        <h3>Taklif va Shikoyatlar</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={formData.name}
            onChange={handleChange}
            required
          />
         
          <textarea
            name="message"
            placeholder="Taklif yoki Shikoyatingizni yozing"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
 
       

          <button type="submit" className="submit-button">
            Yuborish
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Xizmatimizdan mamnunmisiz?</h4>
            <div className="modal-buttons">
              <button onClick={confirmSubmit} className="confirm-button">
                Ha 😊
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Yo'q 😔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
