import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const createSnowflake = () => {
      const snowflakeWrapper = document.createElement("div");
      const flakeSvg = `
        <svg width="10px" height="10px" viewBox="0 0 129.108 140.597" class="flake">
          <path fill="#fff" d="M106.491,83.706l17.706,10.222l-4.067,7.046l-17.88-10.324l4.693,17.494l-7.814,2.096l-6.121-22.916l-0.604-2.402L71,72.519v25.01l1.569,1.627l16.848,16.906l-5.688,5.727L71,108.984V129h-8v-20.221l-12.917,12.807l-5.837-5.727l16.849-16.775L63,97.325V72.519L41.371,84.922l-0.79,2.402l-6.14,22.916l-7.823-2.096l4.688-17.494l-17.882,10.324l-4.068-7.046l17.705-10.222L9.566,79.018l2.096-7.823l23.095,6.188l2.223,0.596l21.66-12.505L37.157,53.071l-2.402,0.644l-22.916,6.14l-2.096-7.823l17.495-4.688L9.358,37.019l4.07-7.046l17.71,10.222l-4.678-17.494l7.842-2.096L40.525,43.7l0.669,2.223L63,58.428V33.622l-1.868-1.758L44.247,15.088l5.8-5.727L63,22.168V2h8v19.963L83.748,9.156l5.668,5.727L72.549,31.79L71,33.418v25.01l21.581-12.505l0.517-2.223l6.188-23.095l7.823,2.096l-4.688,17.494l17.705-10.222l4.068,7.046l-17.882,10.324l17.494,4.688l-2.096,7.823l-22.916-6.14l-2.402-0.644L74.911,65.473L96.57,77.979l2.223-0.596l23.095-6.188l2.096,7.823L106.491,83.706z"/>
        </svg>`;
      snowflakeWrapper.innerHTML = flakeSvg;

      const size = Math.random() * 0.5 + 0.3;
      const duration = Math.random() * 10 + 5;
      const left = Math.random() * 100;

      snowflakeWrapper.className = "flake-wrapper";
      snowflakeWrapper.style.transform = `scale(${size})`;
      snowflakeWrapper.style.left = `${left}%`;
      snowflakeWrapper.style.animationDuration = `${duration}s`;

      document.querySelector(".basket-page").appendChild(snowflakeWrapper);

      setTimeout(() => {
        snowflakeWrapper.remove();
      }, duration * 1000);
    };

    const interval = setInterval(createSnowflake, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="basket-page">
      <div className="basket-product">
        <img src={product.image} alt={product.title} className="product-image" />
        <h2>{product.title}</h2>
        <p>Narxi: {product.price} UZS</p>
        <div className="quantity-control">
          <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
            -
          </button>
          <span className="quality">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <p className="jammi-summa">Jammi: {totalPrice} UZS</p>
        <button
          className="batavsil-btn"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Batavsil
        </button>
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
        <button className="sotib-olish-for" onClick={sendOrderToTelegram}>
          Buyurtma Berish
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Buyurtmangiz qabul qilindi!</p>
            <button onClick={() => navigate("/home")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
