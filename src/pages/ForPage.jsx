import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YaxshiRasim1 from "../assets/doriButilka.png";
import YaxshiRasim2 from "../assets/doriButilka.png";
import YaxshiRasim3 from "../assets/doriButilka.png";
import YaxshiRasim4 from "../assets/doriButilka.png";
import SampleVideo from "../assets/alsafiaclone.mp4"; // Video import qilindi
import BackVidyo from "../assets/editVidyo.mp4"


import "./ForPage.css";
const ForPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Mahsulotlar haqida kengaytirilgan ma'lumotlar
  const products = [
    {
      id: 1,
      title: "Al-Safia Paracetamol",
      price: 12000,
      image: YaxshiRasim1,
      BackVid:BackVidyo,
      description: "Isitmani tushirish va bosh og'rig'ini bartaraf etish uchun samarali vosita.",
      longDescription:
        "Paracetamol bosh og'rig'i, tish og'rig'i va boshqa og'riqlarga qarshi samarali vositadir. U har qanday yoshdagi foydalanuvchilar uchun xavfsizdir.",
      additionalImages: [YaxshiRasim2, YaxshiRasim3, YaxshiRasim4],
      video: SampleVideo, // Video qo'shildi
    },
    {
      id: 2,
      title: "Al-Safia Ibuprofen",
      price: 15000,
      image: YaxshiRasim2,
      description: "Og'riqni kamaytirish va yallig'lanishga qarshi kurashishda ishonchli tanlov.",
      longDescription: "Ibuprofen og‘riq va yallig‘lanishlarni samarali bartaraf etadi.",
      additionalImages: [YaxshiRasim3, YaxshiRasim4],
      video: SampleVideo, // Video qo'shildi
    },
  ];

  const product = products.find((item) => item.id.toString() === id);

  // Buyurtma formasi uchun state
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
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
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
💰 Narxi: ${product.price} UZS
🔢 Soni: ${quantity}
📊 Umumiy Narx: ${totalPrice} UZS
💬 Izoh: ${formData.comment || "Yo'q"}
    `;

    try {
      await Promise.all([
        fetch(
          `https://api.telegram.org/bot${token}/sendMessage?chat_id=${personalChatId}&text=${encodeURIComponent(
            message
          )}`
        ),
        fetch(
          `https://api.telegram.org/bot${token}/sendMessage?chat_id=${groupChatId}&text=${encodeURIComponent(
            message
          )}`
        ),
      ]);
      setShowModal(true); // Buyurtma yuborilganini tasdiqlash
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Buyurtma yuborishda xatolik yuz berdi.");
    }
  };

  if (!product) {
    return (
      <div className="error-message">
        <h2>Mahsulot topilmadi</h2>
        <button onClick={() => navigate("/home")}>Bosh sahifaga qaytish</button>
      </div>
    );
  }

  return (
    <div className="for-page">
      <div className="product-details">
        <img src={product.image} alt={product.title} className="product-image" />
        <h1 className="product-title">{product.title}</h1>
        <p className="product-price">
          <strong>Narxi:</strong> {product.price} UZS
        </p>
        <p className="product-description">{product.description}</p>
        <p className="product-long-description">{product.longDescription}</p>

        {product.video && (
          <div className="media-section">
            <video controls className="product-video">
              <source src={product.video} type="video/mp4" />
              Sizning brauzeringiz video tagini qo‘llab-quvvatlamaydi.
            </video>
          </div>
        )}

        <div className="additional-images">
          {product.additionalImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Qo'shimcha rasm ${index + 1}`}
              className="additional-image"
            />
          ))}
        </div>
      </div>

      <div className="customer-details">
        <h3>Buyurtma Ma’lumotlari</h3>
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
          placeholder="Telefon"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Manzilingiz"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <textarea
          name="comment"
          placeholder="Izoh"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>

        <div className="quantity-control">
          <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <p className="total-price">Umumiy narx: {totalPrice} UZS</p>
        <button className="sotib-olish-for" onClick={sendOrderToTelegram}>
          Buyurtma Berish
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Buyurtmangiz muvaffaqiyatli qabul qilindi! Tez orada mutaxassislarimiz siz bilan bog‘lanadi.</p>
            <button onClick={() => navigate("/home")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForPage;
