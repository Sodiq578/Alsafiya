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
      longDescription: "Al-Safia Paracetamol isitma va og'riqni bartaraf etish uchun mo'ljallangan. Bu mahsulot xavfsiz va samarali bo'lib, bolalar va kattalar uchun mos keladi. Uni bosh og'rig'i, mushak og'rig'i, tish og'rig'i va boshqa og'riq turlarini kamaytirish uchun ishlatish mumkin.",
      additionalImages: [
        "https://via.placeholder.com/150", // Qo'shimcha rasmlar
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      video: "https://www.example.com/sample-video.mp4", // Mahsulot haqida video
    },
    {
      id: 2,
      title: "Al-Safia Ibuprofen",
      price: 15000,
      image: CardImg,
      description: "Og'riqni kamaytirish va yallig'lanishga qarshi kurashishda ishonchli tanlov. Tez ta'sir qiluvchi va uzoq davom etuvchi formulaga ega.",
      longDescription: "Al-Safia Ibuprofen og'riqni tezda kamaytirish va yallig'lanishni yo'q qilishda samarali. Sport jarohatlari, suyak yoki bo'g'im muammolari, shuningdek, bosh og'rig'ida ishlatiladi.",
      additionalImages: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      video: "https://www.example.com/sample-video-ibuprofen.mp4",
    },
    {
      id: 3,
      title: "Al-Safia Vitamin C",
      price: 10000,
      image: CardImg,
      description: "Immunitetni mustahkamlash va energiya darajasini oshirish uchun mo'ljallangan. Tabiiy antioksidant xususiyatlarga ega.",
      longDescription: "Al-Safia Vitamin C immunitet tizimini qo'llab-quvvatlaydi va energiyani oshiradi. Antioksidant sifatida ishlaydi va kundalik faoliyatda yordam beradi.",
      additionalImages: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      video: "https://www.example.com/sample-video-vitamin.mp4",
    },
    {
      id: 4,
      title: "Al-Safia Antacid",
      price: 18000,
      image: CardImg,
      description: "Oshqozon kislotasini kamaytirish va yoqimsiz kuydiruvni bartaraf etish uchun samarali dori.",
      longDescription: "Al-Safia Antacid oshqozon kislotasini zararsizlantiradi va ovqat hazm qilishni yaxshilaydi. Qorinda kuyish va oshqozon noqulayligini bartaraf etadi.",
      additionalImages: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      video: "https://www.example.com/sample-video-antacid.mp4",
    },
    {
      id: 5,
      title: "Al-Safia Cough Syrup",
      price: 20000,
      image: CardImg,
      description: "Yo'talni tinchlantiruvchi va nafas yo'llarini tozalovchi sirop.",
      longDescription: "Al-Safia Cough Syrup yo'talni tezda tinchlantiradi va nafas yo'llarini ochadi. Sovuq kunlarda va shamollash mavsumida ishonchli yordamchingiz.",
      additionalImages: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      video: "https://www.example.com/sample-video-cough.mp4",
    },
    {
      id: 6,
      title: "Al-Safia Multivitamin",
      price: 25000,
      image: CardImg,
      description: "Tanangizga zarur bo'lgan barcha vitamin va minerallarni taqdim etuvchi ko'p funksiyali qo'shimcha.",
      longDescription: "Al-Safia Multivitamin sizning umumiy sog'lig'ingizni yaxshilash uchun zarur bo'lgan vitamin va minerallar bilan to'ldirilgan. Bu mahsulot energiya darajasini oshiradi va immunitetni kuchaytiradi.",
      additionalImages: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      video: "https://www.example.com/sample-video-multivitamin.mp4",
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
