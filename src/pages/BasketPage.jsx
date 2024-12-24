import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import "./BasketPage.css";

const BasketPage = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    timeOfDay: "", // Kun vaqti
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modalni ko'rsatish uchun state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOrderToTelegram = async () => {
    if (!formData.name || !formData.phone || !formData.timeOfDay) {
      alert("Iltimos, barcha kerakli maydonlarni to‘ldiring!");
      return;
    }

    setIsLoading(true);

    const token = "7989375094:AAEHcBrkImnG69KAH0rgLFHOnF1RB0khFO4";
    const personalChatId = "7609164487";
    const groupChatId = "-4732465232";

    // Faqat kerakli maydonlarni yuborish
    const message = `
🆕 Yangi Buyurtma:


👤 Ism: ${formData.name}

📞 Telefon: ${formData.phone}

🕒 Kun vaqti: ${formData.timeOfDay}
    `;

    try {
      const personalResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${personalChatId}&text=${encodeURIComponent(
          message
        )}`
      );

      const groupResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${groupChatId}&text=${encodeURIComponent(
          message
        )}`
      );

      if (personalResponse.ok && groupResponse.ok) {
        setShowModal(true); // Modalni ko'rsatish
        setFormData({ name: "", phone: "", timeOfDay: "" }); // Formani tozalash
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko‘ring.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi, qaytadan urinib ko‘ring.");
    }

    setIsLoading(false);
  };

  if (!product) {
    return <p>Mahsulot topilmadi. Iltimos, qaytadan urinib ko‘ring.</p>;
  }

  return (
    <div className="basket-page">
      {/* Product Header */}
      <div className="product-header" style={{ backgroundImage: `url(${product.image})` }}>
        <button className="back-button" onClick={() => navigate("/home")}>
          <FaChevronLeft />
        </button>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
      </div>

      {/* Order Section */}
      <div className="order-section">
        <h3>Buyurtma ma’lumotlari</h3>
        <input
          type="text"
          name="name"
          placeholder="Ismingiz"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="+998"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* Kun vaqti Dropdown */}
        <select
          name="timeOfDay"
          value={formData.timeOfDay}
          onChange={handleChange}
        >
          <option value="">Murojaat qilish vaqti</option>
          <option value="Kunning birinchi yarmida">Kunning birinchi yarmida</option>
          <option value="Kunning ikkinchi yarmida">Kunning ikkinchi yarmida</option>
          <option value="Farqi yo'q">Farqi yo'q</option>
        </select>

        <button
          className="order-button"
          onClick={sendOrderToTelegram}
          disabled={isLoading || !formData.name || !formData.phone || !formData.timeOfDay}
        >
          {isLoading ? "Yuborilyapti..." : "Buyurtma Berish"}
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>✅ Buyurtmangiz qabul qilindi!</p>
            <p>Tez orada mutaxasisslarimiz siz bilan bog‘lanadi.</p>
            <button className="btn-ok" onClick={() => navigate("/home")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
