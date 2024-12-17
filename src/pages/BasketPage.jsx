import React, { useState, useEffect } from "react";
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
    address: "",
    comment: "",
    timeOfDay: "", // Yangi field qo'shildi
  });

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = product ? product.price * quantity : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOrderToTelegram = async () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.timeOfDay) {
      alert("Iltimos, barcha kerakli maydonlarni to‘ldiring!");
      return;
    }

    setIsLoading(true);
    
    const token = "7574619491:AAE_MF8Ru8dao7bBRDwmdJXwGKi6wLtrovw";
    const personalChatId = "194533033";
    const groupChatId = "-4712747805";

    const message = `
🆕 Yangi Buyurtma:
👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
📍 Manzil: ${formData.address}
📦 Mahsulot: ${product.title}
💰 Narxi: ${product.price.toLocaleString()} UZS
🔢 Soni: ${quantity}
📊 Umumiy Narx: ${totalPrice.toLocaleString()} UZS
💬 Izoh: ${formData.comment || "Yo'q"}
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
        setShowModal(true);
        setFormData({ name: "", phone: "", address: "", comment: "", timeOfDay: "" });
        setQuantity(1);
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko‘ring.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi, qaytadan urinib ko‘ring.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 3000); // Automatically navigate after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

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

        <iframe
          className="youtubevid"
          width="330"
          height="215"
          src="https://www.youtube.com/embed/RKbqazwsVlY?si=frQj5X-5otmDfZ3B"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
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
        <input
          type="text"
          name="address"
          placeholder="Manzilingiz"
          value={formData.address}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Izoh"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>

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
          disabled={isLoading || !formData.name || !formData.phone || !formData.address || !formData.timeOfDay}
        >
          {isLoading ? "Yuborilyapti..." : "Buyurtma Berish"}
        </button>
      </div>

      {/* Scroll Button */}
 

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
