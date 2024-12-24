import React, { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [satisfaction, setSatisfaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  // Form ma'lumotlarini o‘zgartirish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Telegram'ga yuborish funktsiyasi
  const sendToTelegram = async () => {
    const token = "7989375094:AAEHcBrkImnG69KAH0rgLFHOnF1RB0khFO4";
    const personalChatId = "7609164487";
    const groupChatId = "-4732465232";

    const message = `
📢 Taklif va Shikoyatlar:
👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
💬 Xabar: ${formData.message}
😃 Mamnunmi: ${satisfaction ? "Yo'q 😔" : "  Ha 😊"}

    `;



    try {
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
        setFormData({ name: "", phone: "", message: "" });
        setSatisfaction(null);
        setSuccessModal(true); // Muvaffaqiyatli modalni ko‘rsatish
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

  // Xizmatdan mamnunmisiz degan modalni tasdiqlash
  const handleSatisfactionChange = (answer) => {
    setSatisfaction(answer);
    setShowModal(false); // Modalni yopish
    sendToTelegram(); // Telegram'ga yuborish
  };

  // Modalni yopish
  const closeSuccessModal = () => {
    setSuccessModal(false); // Success modalni yopish
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
          <input
            type="tel"
            name="phone"
            placeholder="Telefon raqamingiz"
            value={formData.phone}
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
              <button
                onClick={() => handleSatisfactionChange(true)}
                className="confirm-button"
              >
                Ha 😊
              </button>
              <button
                onClick={() => handleSatisfactionChange(false)}
                className="cancel-button"
              >
                Yo'q 😔
              </button>
            </div>
          </div>
        </div>
      )}

      {successModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Xabaringiz muvaffaqiyatli yuborildi!</h4>
            <button
              onClick={closeSuccessModal}
              className="close-button"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
