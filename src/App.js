import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/HomePage";
import BasketPage from "./pages/BasketPage";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import CardImg from "./assets/doriButilka.png"
import Navbar from "./components/Navbar";
import ForPage from "./pages/ForPage";
import "./index.css";

const App = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Al-Safia Paracetamol",
      price: 12000,
      image: CardImg,
      description: "Isitmani tushirish va bosh og'rig'ini bartaraf etish uchun samarali vosita. Yumshoq formulasi tufayli qo'llash oson va nojo'ya ta'sirlari kam.",
    },
    {
      id: 2,
      title: "Al-Safia Ibuprofen",
      price: 15000,
      image: CardImg,
      description: "Og'riqni kamaytirish va yallig'lanishga qarshi kurashishda ishonchli tanlov. Tez ta'sir qiluvchi va uzoq davom etuvchi formulaga ega.",
    },
    {
      id: 3,
      title: "Al-Safia Vitamin C",
      price: 10000,
      image: CardImg,
      description: "Immunitetni mustahkamlash va energiya darajasini oshirish uchun mo'ljallangan. Tabiiy antioksidant xususiyatlarga ega.",
    },
    {
      id: 4,
      title: "Al-Safia Antacid",
      price: 18000,
      image: CardImg,
      description: "Oshqozon kislotasini kamaytirish va yoqimsiz kuydiruvni bartaraf etish uchun samarali dori. Ovqat hazm qilishni yaxshilaydi.",
    },
    {
      id: 5,
      title: "Al-Safia Cough Syrup",
      price: 20000,
      image: CardImg,
      description: "Yo'talni tinchlantiruvchi va nafas yo'llarini tozalovchi sirop. Sovuq kunlar va shamollash mavsumida ishonchli yordamchingiz.",
    },
    {
      id: 6,
      title: "Al-Safia Multivitamin",
      price: 25000,
      image: CardImg,
      description: "Tanangizga zarur bo'lgan barcha vitamin va minerallarni taqdim etuvchi ko'p funksiyali qo'shimcha. Energiya va immunitetni oshiradi.",
    },
  ]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <HomePage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route
          path="/basket"
          element={<BasketPage cartItems={cartItems} />}
        />
        <Route
          path="/product/:id"
          element={<ForPage cartItems={cartItems} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
