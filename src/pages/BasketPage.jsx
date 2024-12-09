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
    address: "",
    comment: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const totalPrice = product ? product.price * quantity : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOrderToTelegram = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Iltimos, barcha kerakli maydonlarni to‘ldiring!");
      return;
    }

    const token = "7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0";
    const personalChatId = "5838205785";
    const groupChatId = "-1002480723282";

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
        setFormData({ name: "", phone: "", address: "", comment: "" });
        setQuantity(1);
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko‘ring.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi, qaytadan urinib ko‘ring.");
    }
  };

  if (!product) {
    return <p>Mahsulot topilmadi</p>;
  }

  return (
    <div className="basket-page">
      {/* Product Header */}
      <div className="product-header" style={{ backgroundImage: `url(${product.image})` }}>
        <button className="back-button" onClick={() => navigate("/home")}>
          <FaChevronLeft />
        </button>
        <h2 className="product-price-secondary">Narxi: {product.price.toLocaleString()} UZS</h2>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h2 className="product-price-secondary">{product.price.toLocaleString()} UZS</h2>
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
 


<iframe   
 className="youtubevid"
width="330"
          height="215" src="https://www.youtube.com/embed/RKbqazwsVlY?si=frQj5X-5otmDfZ3B" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        <div className="quantity-section">
          <div className="quality-box">
            <p>Jami:</p>
            <p className="narx">{totalPrice.toLocaleString()} UZS</p>
          </div>

          <div className="quantity-control">
            <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
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

        <button className="order-button" onClick={sendOrderToTelegram}>
          Buyurtma Berish
        </button>
      </div>

      {/* Scroll Button */}
      <button
        className="scroll-button"
        onClick={() => document.querySelector(".quantity-section").scrollIntoView({ behavior: "smooth" })}
      >
       <FaChevronLeft className="skroll-btn-pass" />
      </button>

      {/* Success Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>✅ Buyurtmangiz qabul qilindi!</p>
            <p>Tez orada operatorlarimiz siz bilan bog‘lanadi.</p>
            <button className="btn-ok" onClick={() => navigate("/home")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
