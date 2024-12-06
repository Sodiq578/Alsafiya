import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ForPage.css";

const ForPage = ({ cartItems }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const product = cartItems.find((item) => item.id.toString() === id);

  const generateRandomId = () => Math.floor(Math.random() * 1000000);
  const orderId = generateRandomId();

  if (!product) {
    return (
      <div className="error-message">
        <h2>Mahsulot topilmadi</h2>
        <button onClick={() => navigate("/home")}>Bosh sahifaga qaytish</button>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOrderToTelegram = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Iltimos, barcha kerakli maydonlarni to'ldiring!");
      return;
    }

    const token = "7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0";
    const personalChatId = "5838205785";
    const groupChatId = "-4088640919";

    const message = `
🆕 Yangi Buyurtma:
🆔 Buyurtma ID: ${orderId}
👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
📍 Manzil: ${formData.address}
📦 Mahsulot: ${product.title}
💰 Narxi: ${product.price} UZS
🔢 Soni: ${quantity}
📊 Umumiy Narx: ${totalPrice} UZS
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
        setShowModal(true); // Modal oynani ko'rsatish
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  return (
    <div className="for-page">
      <div className="product-details">
        <img src={product.image} alt={product.title} className="product-image" />
        <h1 className="product-title">{product.title}</h1>
        <p className="product-price">
          <strong>Narxi:</strong> {product.price} UZS
        </p>
      </div>

      <div className="customer-details">
        <h3>Buyurtma Ma’lumotlari</h3>
        <input
          type="text"
          name="name"
          placeholder="Ismingizni kiriting"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefon raqamingizni kiriting"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Manzilingizni kiriting"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <textarea
          name="comment"
          placeholder="Kuryer uchun izoh"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>
        <div className="quantity-control">
          <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
            -
          </button>
          <span className="quality">{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <p className="jammi-summa">Jammi: {totalPrice} UZS</p>
        <button className="sotib-olish-for" onClick={sendOrderToTelegram}>
          Buyurtma Berish
        </button>
      </div>

      {/* Modal Oyna */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Buyurtma muvaffaqiyatli qabul qilindi!</p>
            <p>Sizga operatorlarimiz tez orada qo'ng'iroq qilishadi.</p>
            <button onClick={() => navigate("/home")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForPage;
