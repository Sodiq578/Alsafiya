import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./BasketPage.css";

const BasketPage = () => {
  const { state } = useLocation();
  const { product } = state;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const [quantity, setQuantity] = useState(1);
  const totalPrice = product.price * quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOrderToTelegram = async () => {
    const token = "7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0";
    const chatId = "5838205785";

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
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
          message
        )}`
      );
      if (response.ok) {
        alert("Buyurtma muvaffaqiyatli yuborildi!");
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
          <span>{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <p>Total: {totalPrice} UZS</p>
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
        <button onClick={sendOrderToTelegram}>Buyurtma Berish</button>
      </div>
    </div>
  );
};

export default BasketPage;
