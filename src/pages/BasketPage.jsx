import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BasketPage.css";

const BasketPage = () => {
  const { state } = useLocation();
  const { product } = state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false); // Modal oynani boshqarish
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

    const token = "7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0"; // Telegram bot tokeni
    const personalChatId = "5838205785"; // Shaxsiy Telegram chat ID
    const groupChatId = "-4088640919"; // Guruh chat ID

    const message = `
🆕 Yangi Buyurtma:
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
      // Shaxsiy chatga yuborish
      const personalResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${personalChatId}&text=${encodeURIComponent(
          message
        )}`
      );

      // Guruh chatiga yuborish
      const groupResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${groupChatId}&text=${encodeURIComponent(
          message
        )}`
      );

      // Agar ikkala yuborish ham muvaffaqiyatli bo'lsa, modalni ko'rsatish
      if (personalResponse.ok && groupResponse.ok) {
        setShowModal(true); // Modal oynani ko'rsatish
        setFormData({ name: "", phone: "", address: "", comment: "" });
        setQuantity(1);
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  return (
    <div className="basket-page">
      <div className="basket-product">
        <img src={product.image} alt={product.title} className="product-image" />
        <h2>{product.title}</h2>
        <p>Price: {product.price} UZS</p>
        <div className="quantity-control">
          <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
            -
          </button>
          <span className="quality">{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <p className="jammi-summa">Jammi: {totalPrice} UZS</p>
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
        <button
          className="more"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Batavsil
        </button>
        <button className=" sotib-olish-backet" onClick={sendOrderToTelegram}>
          Buyurtma Berish
        </button>
      </div>

      {/* Modal Oyna */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Buyurtmangiz qabul qilindi!</p>
            <p>Sizga operatorlarimiz tez orada qo'ng'iroq qilishadi.</p>
            <button onClick={() => navigate("/home")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
