import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BasketPage.css";
import "./ForPage.css";

const ForPage = ({ cartItems }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = cartItems.find((item) => item.id.toString() === id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false); // Modal oynani boshqarish
  const totalPrice = product ? product.price * quantity : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOrderToTelegram = async () => {
    // Forma to'ldirilganligini tekshirish
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Iltimos, barcha kerakli maydonlarni to'ldiring!");
      return;
    }

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
        // Buyurtma yuborilganida modal oynani ko'rsatish
        setShowModal(true);
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  if (!product) {
    return (
      <div className="for-page">
        <h1>Mahsulot topilmadi</h1>
      </div>
    );
  }

  return (
    <div className="for-page">
    <div className="product-details">
  <img src={product.image} alt={product.title} className="product-image" />
  <h1 className="product-title">{product.title}</h1>
  <p className="product-price">
    <strong>Narxi:</strong> {product.price} so'm
  </p>
  <p className="product-description">
    <strong>Malumotlar:</strong> {product.description || "No description available."}
  </p>
</div>

      {/* Forma */}
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
        <p className="jammi-summa">Jammi: {totalPrice} so'm</p>
        <button
  style={{ width: "90%" ,
    marginTop: "80px",
     
    color: "white",
    fontWeight: "bold",
    borderRadius: "5px"
  }}
  className="sotib-olish"
  onClick={sendOrderToTelegram}
>
  Buyurtma Berish
</button>
      </div>

      {/* Modal Oyna */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              Sizning buyurtmangiz qabul qilindi. Operatorlarimiz tez orada
              siz bilan bog'lanishadi!
            </p>
            <button onClick={() => navigate("/home")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForPage;
